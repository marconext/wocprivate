# dotnet

* `dotnet build`
* `dotnet run`
* `dotnet restore`


## sln
Add Solution file
im entsprechenden Folder. Der name der <name>.sln entspricht dem foldernamen.

`dotnet new sln`

Add Project to solution 

`dotnet sln add ./woc.appDomain/woc.appDomain.csproj`

## Project
Add reference to project
Im entsprechenden projekt zB. ./woc.appInfrastructure/

`dotnet add refrence ./woc.appDomain/woc.appDomain.csproj`

add npm package

`dotnet add package Dapper --version 1.50.4`


# markdown cheatsheet
https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet


# Secrets
Siehe details here:
https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?tabs=visual-studio-code

* `dotnet user-secrets -h` (help)
* `dotnet user-secrets list` (zeigt alle secrets für das projekt)

When using any of the tools packages defined in the tools section of your project.json file, you must use them from the same directory that contains the project.json file.

Für das Projekt im aktuellen verzeichnis:

`dotnet user-secrets set MySecret ValueOfMySecret`
zB.
dotnet user-secrets set secretConnectionString Server=tcp:wocsqlserver.database.windows.net,1433;Database=wocsqldb;User ID=someuser;Password=*******;Encrypt=true;Connection Timeout=30;

# Git Repository
der personal access token kann in dxc.github.com unter Profile -> Settings -> Developer Settings -> Personal Access Tocken gesetzt werden.
* `git remote rm origin`
* `git remote add origin https://rschindele:<personal access token>@github.dxc.com/Web-App-Development/WoCSrc.git`
* `git push origin master`


