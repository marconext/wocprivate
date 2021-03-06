@if "%SCM_TRACE_LEVEL%" NEQ "4" @echo off

:: ----------------------
:: KUDU Deployment Script
:: Version: 1.0.17
:: ----------------------

:: Prerequisites
:: -------------

:: Verify node.js installed
where node 2>nul >nul
IF %ERRORLEVEL% NEQ 0 (
  echo Missing node.js executable, please install node.js, if already installed make sure it can be reached from current environment.
  goto error
)

:: Setup
:: -----

setlocal enabledelayedexpansion

SET ARTIFACTS=%~dp0%..\artifacts

SET DEPLOYMENT_SOURCE=%DEPLOYMENT_SOURCE%\woc.ng
IF NOT DEFINED DEPLOYMENT_SOURCE (
  SET DEPLOYMENT_SOURCE=%~dp0%\woc.ng
)

IF NOT DEFINED DEPLOYMENT_TARGET (
  SET DEPLOYMENT_TARGET=%ARTIFACTS%\wwwroot
)

IF NOT DEFINED NEXT_MANIFEST_PATH (
  SET NEXT_MANIFEST_PATH=%ARTIFACTS%\manifest

  IF NOT DEFINED PREVIOUS_MANIFEST_PATH (
    SET PREVIOUS_MANIFEST_PATH=%ARTIFACTS%\manifest
  )
)

IF NOT DEFINED KUDU_SYNC_CMD (
  :: Install kudu sync
  echo Installing Kudu Sync
  call npm install kudusync -g --silent
  IF !ERRORLEVEL! NEQ 0 goto error

  :: Locally just running "kuduSync" would also work
  SET KUDU_SYNC_CMD=%appdata%\npm\kuduSync.cmd
)
goto Deployment

:: Utility Functions
:: -----------------

:SelectNodeVersion

IF DEFINED KUDU_SELECT_NODE_VERSION_CMD (
  :: The following are done only on Windows Azure Websites environment
  echo select Node Verison:
  echo DEPLOYMENT_SOURCE: %DEPLOYMENT_SOURCE%
  echo DEPLOYMENT_TARGET: %DEPLOYMENT_TARGET%
  echo DEPLOYMENT_TEMP: %DEPLOYMENT_TEMP%
  
  call %KUDU_SELECT_NODE_VERSION_CMD% "%DEPLOYMENT_SOURCE%" "%DEPLOYMENT_TARGET%" "%DEPLOYMENT_TEMP%"
  IF !ERRORLEVEL! NEQ 0 goto error

  IF EXIST "%DEPLOYMENT_TEMP%\__nodeVersion.tmp" (
    SET /p NODE_EXE=<"%DEPLOYMENT_TEMP%\__nodeVersion.tmp"
    IF !ERRORLEVEL! NEQ 0 goto error
  )
  
  IF EXIST "%DEPLOYMENT_TEMP%\__npmVersion.tmp" (
    SET /p NPM_JS_PATH=<"%DEPLOYMENT_TEMP%\__npmVersion.tmp"
    IF !ERRORLEVEL! NEQ 0 goto error
  )

  IF NOT DEFINED NODE_EXE (
    SET NODE_EXE=node
  )

  SET NPM_CMD="!NODE_EXE!" "!NPM_JS_PATH!"
) ELSE (
  SET NPM_CMD=npm
  SET NODE_EXE=node
)

goto :EOF

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: Deployment
:: -----------

:Deployment
echo Handling node.js deployment.
echo DEPLOYMENT_SOURCE:  %DEPLOYMENT_SOURCE%

REM :: 0. npm.cmd cache clean
REM call :ExecuteCmd !NPM_CMD! npm cache clean --force
REM   IF !ERRORLEVEL! NEQ 0 goto error

:: 1. Select node version
call :SelectNodeVersion
echo Nach SelectNodeVersion.


:: 2. Install NPM package (Including dependency packages)
IF EXIST "%DEPLOYMENT_SOURCE%\package.json" (
  echo call npm install in %DEPLOYMENT_SOURCE%
  pushd "%DEPLOYMENT_SOURCE%"
  call :ExecuteCmd !NPM_CMD! install
  IF !ERRORLEVEL! NEQ 0 goto error
  popd
) ELSE (
  echo %DEPLOYMENT_SOURCE% has no package.json
)

REM echo cd %DEPLOYMENT_SOURCE%
REM cd "%DEPLOYMENT_SOURCE%"
REM call :ExecuteCmd "npm install"

:: 3. Angular Prod Build (Executes 'build' cmd from package.json)
IF EXIST "%DEPLOYMENT_SOURCE%/angular.json" (
echo Building App in %DEPLOYMENT_SOURCE%…
pushd "%DEPLOYMENT_SOURCE%"
REM call :ExecuteCmd !NPM_CMD! run build
call :ExecuteCmd !NPM_CMD! run buildForProdDeployment
IF !ERRORLEVEL! NEQ 0 goto error
popd
)

:: 4. KuduSync (Copying files from 'dist' folder to 'wwwroot' folder)
IF /I "%IN_PLACE_DEPLOYMENT%" NEQ "1" (
  call :ExecuteCmd "%KUDU_SYNC_CMD%" -v 50 -f "%DEPLOYMENT_SOURCE%/dist" -t "%DEPLOYMENT_TARGET%" -n "%NEXT_MANIFEST_PATH%" -p "%PREVIOUS_MANIFEST_PATH%" -i ".git;.hg;.deployment;deploy.cmd"
  IF !ERRORLEVEL! NEQ 0 goto error
)

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
goto end

:: Execute command routine that will echo out when error
:ExecuteCmd
setlocal
set _CMD_=%*
echo start executing: %_CMD_%
call %_CMD_%
if "%ERRORLEVEL%" NEQ "0" echo Failed exitCode=%ERRORLEVEL%, command=%_CMD_%
exit /b %ERRORLEVEL%

:error
endlocal
echo An error has occurred during web site deployment.
call :exitSetErrorLevel
call :exitFromFunction 2>nul

:exitSetErrorLevel
exit /b 1

:exitFromFunction
()

:end
endlocal
echo Finished successfully.
