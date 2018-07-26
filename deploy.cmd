@echo off

IF "%FLAVOR%" == "API" (
  deploy.api.cmd
) ELSE (
  IF "%FLAVOR%" == "NG" (
    deploy.NG.cmd
  ) ELSE (
    echo You have to set SITE_FLAVOR setting to either "API" or "NG"
    echo Do it by setting the AppSettings in Azure WebApp
    exit /b 1
  )
)