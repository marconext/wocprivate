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


## Create a web app für woc.web-api
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


## Create a web app für woc.web-api
```
az webapp create --resource-group WocResourceGroup --plan WocAppServicePlan --name WoCAppNg --deployment-local-git
```



## Prepare local Git (on developer's machine)
```Shell Session
git remote add azure https://woc-deployer@wocapps.scm.azurewebsites.net/WoCApps.git
git push azure master
```

## .Deployment file
[config]
project = WebProject/WebProject.csproj

## Andere Möglichkeiten
Es gibt neben den Deploment files auch die Möglich keit, den Inhalt von Zb. .deployement : project = woc.web-api/woc.web-api.csproj
auch in Applications settings von der Azure WebApp ein Eintrag mit [Project | woc.web-api/woc.web-api.csproj] als key value anzugeben.
Das hätte den gleichen effekt wie wenn man diese inofrmation direkt im .deployment file hätte und kein deploy.cmd erstellen würde.
Es hat den Vorteil wenn man mehrere Webaps aus dem selben .git repository erstellen möchte. siehe dazu die doku von KUDU mit Customizing deployments.


## Set Environment
Damit der richtige Connectionstring im web-api projekt ausgewählt werden kann. siehe start.cs
```
az webapp config appsettings set --name WoCApps --resource-group WocResourceGroup --settings ASPNETCORE_ENVIRONMENT="Production"
```

## Set Db Connection String
az webapp config connection-string set --name WoCApps --resource-group WocResourceGroup --settings EnvDbConnection='Server=tcp:wocsqlserver.database.windows.net,1433;Database=wocsqldb;User ID=marcomaechler;Password=wocdev012*;Encrypt=true;Connection Timeout=30;' --connection-string-type SQLServer


## Multi Projects deployment
Wir haben in unserer "Solution" ja zwei Projekte. Angular und das dotnet core Web-api.
Das deployment dieser beiden projekte auf Azure App Service ist gar nicht so trivial. Es gibt auch verschiedene Approaches.
Ich wähle jetzt den folgenden, un dversuche diesen umzusetzen.
Wir haben ein .deployment file, welches auf das deploy.cmd verweist.
Im deploy.cmd haben wir eine Entscheidung, ob wir das Web-api oder das angular projekt deployen möchten.
Die Entscheidung fällt aufgrund einer AppSettings variablen, die in der entsperechenden Web App unter dem App Service gesetzt wird.
Also die Variable heisst zB. "FLAVOR" und kann den Inhalt "WebApi" oder "NG" haben.

Auf Grund dieser Entscheidung wird dann ein weiteres deplyo..cmd aufgerufen. Entweder deploy.api.cmd, oder deploy.ng.cmd.
Das deploy.api.cmd ist von einem erfolgreichen Kudu deployment kopiert.

Für das deploy.ng.cmd suche ich ein Beispiel im Web.
(zB. dieses hier https://dotnetthoughts.net/deploying-your-angular-app-to-azure/)

### .deployment
Dies verweisst  auf deploy.cmd
### deploy.cmd
Hier hat es eine Weiche basierend auf der Environment variable FLAVOR, welche in den appsettings der entsprechenden WebApps gesetzt wird.
Also FLAVOR="API" für woc.web-api, und FLAVOR="NG" für woc.ng
### deploy.api.cmd
das deployment script für api. Die source wurde von Kudu aus einer laufenden app kopiert.
### deploy.ng.cmd
das deployment script für ng. Die source kommt aus dem web.

## Angular deployment webserver
Da Angular eine Singlepage application ist, muss der webserver so konfiguriert werden, dasss wenn direkt eine Route eingegeben wird, 
also zB. https://www.url.com/project Dass dann auf das root verzeichnis geredirected wird (/). weil der server keine resource unter /project hat. davon weiss nur die Angular app auf dem client.

Ausserdem könnte es noch probleme mit CORS geben. Das sollte in der api applikation gehandelt werden.