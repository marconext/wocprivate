Wir wollen die Applikation irgendwo hosten.
Ein Kandidat ist natürlich Azure
Dieser Aproach hier verwendet ein Windows AppService Hosting.
Es folgen noch andere Aproaches.

Dieser Approach ist gemäss diesem Dokument: https://docs.microsoft.com/en-us/azure/app-service/containers/quickstart-dotnetcore


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
az appservice plan create --name WocAppServicePlan --resource-group WocResourceGroup --sku S1 --is-linux
```


## Create a web app
Bash:
```
az webapp create --resource-group WocResourceGroup --plan WocAppServicePlan --name WoCApps --runtime "dotnetcore|2.0" 
--deployment-local-git
```
(to list available dotnet core versions for Linux:  az webapp list-runtimes --linux)

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