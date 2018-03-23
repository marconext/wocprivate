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
* `dotnet user-secrets --list` (zeigt alle secrets für das projekt)



Für das Projekt im aktuellen verzeichnis:

`dotnet user-secrets set MySecret ValueOfMySecret`



