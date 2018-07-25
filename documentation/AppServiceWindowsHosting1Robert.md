Wir wollen die Applikation irgendwo hosten.
Ein Kandidat ist natürlich Azure
Dieser Aproach hier verwendet ein Windows AppService Hosting mit einer Windows Machine.
Es folgen noch andere Aproaches.

Dieser Approach ist gemäss diesem Dokument: https://docs.microsoft.com/en-us/azure/app-service/containers/quickstart-dotnetcore
aber nicht mit --is-linux setting in Serviceplan generation
die erstellung mit linux habe ich vorher gemacht. und lösche die jetzt, damit ich nicht zu hohe kosten habe.

Dieses Tutorial hat mir sehr geholfen:
http://blog.aaroney.com/2017/02/03/NET-Core-Web-App-in-Azure/



## deployment user
```
az webapp deployment user set --user-name woc-deployer --password secret123
```
log in with wocapps\woc-deployer

## Create a resource group
```
az group create --name WocResourceGroup --location "West Europe"
```
(to list the resource groups available for linux: az appservice list-locations --sku S1 --linux-workers-enabled )

## Create an Azure App Service plan
```
az appservice plan create --name WocAppServicePlan --resource-group WocResourceGroup --sku S1
```


## Create a web app
Bash:
```
az webapp create --resource-group WocResourceGroup --plan WocAppServicePlan --name WoCApps --runtime "dotnetcore|2.0" --deployment-local-git
```
(to list available dotnet core versions for Linux:  az webapp list-runtimes --linux)

ursprünglich hatte ich hier noch runtime --runtime "dotnetcore|2.0" settings.
Weil ich dachte, ich möchte ja eine dotnet core api deployen.
Aber gemäss tutorial stimmt das nicht. und so scheint es zu funktionieren.

um nachträglich auf local-git deployment zu stellen:
az webapp deployment source config-local-git --name WoCApps --resource-group WocResourceGroup

### Local git (on deployment app service) is configured with url of
    https://woc-deployer@wocapps.scm.azurewebsites.net/WoCApps.git

### url
    http://wocapps.azurewebsites.net/

## Prepare local Git (on developer's machine)
```Shell Session
git remote add azure https://woc-deployer@wocapps.scm.azurewebsites.net/WoCApps.git
git push azure master
```

## .Deployment file
[config]
project = WebProject/WebProject.csproj


## Set Environment

az webapp config appsettings set --name WoCApps --resource-group WocResourceGroup --settings ASPNETCORE_ENVIRONMENT="Production"

## Set Db Connection String
az webapp config connection-string set --name WoCApps --resource-group WocResourceGroup --settings EnvDbConnection='Server=tcp:wocsqlserver.database.windows.net,1433;Database=wocsqldb;User ID=marcomaechler;Password=wocdev012*;Encrypt=true;Connection Timeout=30;' --connection-string-type SQLServer