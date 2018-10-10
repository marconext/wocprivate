# Azure Deployment für WOC

Da wir für Microsoft Azure eine Test-Subscription haben auf der wir ohne weitere Kosten unsere WOC App hosten können haben wir 
uns für Microsoft Azure als Cloud Hoster entschieden.

Hier ein Tutorial, wie unsere App deployed wird und Continous Deployment mit Microsoft Azure im Zusammenspiel mit unserem DXC
GitHub Repository eingerichtet wird.

## Azure Cloud Services einrichten

Wir richten 2 AppServices ein: Einer für die Angular Frontend App und einer für den NetCore Backend Teil. Weiter brauchen für als DataStore eine SQL DB.

### Azure Deployment User

Als erstes müssen wir einen Azure Deployment User Account einrichten. 
Entweder machen wir das übers Azure Portal oder mit folgendem CLI Command

```
az webapp deployment user set --user-name deploymentuser --password pw99*
```

### Ressourcengruppe

Als nächstes brauchen wir eine RessourcenGruppe in der wir alle benötigten Azure Elemente zusammenfassen können. 
```
az group create --name wocapp --location "West Europe"
```

### SQL DB  einrichten
Mit diesem Script wird die SQL DB und der dazu nötige SQL Server eingerichten. Username und Password für den Admin User müssen angegeben werden.
```
az sql server create --name wocsqlserver --resource-group wocapp --location "South Central US" --admin-user wocuser --admin-password wocpassword
az sql server firewall-rule create --resource-group wocapp --server wocsqlserver --name AllowYourIp --start-ip-address 0.0.0.1 --end-ip-address 255.255.255.255
az sql db create --resource-group wocapp --server wocsqlserver --name wocdevsqldb --service-objective S0
```

### Angular Frontend App

Mit folgendem Script wird eine Webapp mit namen wocwebng eingerichtet. Ausserdem wird zuerst ein AzureApp Service Plan erstellt. Dieser definitiert die Leistung und Configuration des Systems hinter dem Appservice und ist kostenrelevant.
Wichtig ist auch die Node.js Version. Wir verwenden 8.9.4

```
az appservice plan create --name WocAppServicePlanWin --resource-group wocapp --location "West Europe" --sku S1 
az webapp create --resource-group wocapp --plan WocAppServicePlanWin --name wocwebng --deployment-source-branch Master --runtime "node|8.1"
az webapp config connection-string set --resource-group  wocapp --name wocwebng --settings 
az webapp config appsettings set --name wocwebng --resource-group wocapp --settings ASPNETCORE_ENVIRONMENT="Production"
az webapp config appsettings set --name WoCWebNg --resource-group wocapp --settings FLAVOR="NG"
az webapp config appsettings set --name WoCWebNg --resource-group wocapp --settings WEBSITE_NODE_DEFAULT_VERSION="8.9.4"
```
### Angular Backend App

Nun erstellen wir den Backend Teil.  Den App Service Plan müssen wir nicht mehr erstellen, da wir ihn schon beim Angular-Teil erstellt haben und hier den selben verwenden. 
Den MyDBConnection String findet man in der eben eingerichteten SQL DB im Azure Portal.

```
az webapp create --resource-group wocapp --plan WocAppServicePlanWin --name wocwebapi --deployment-source-branch Master
az webapp config connection-string set --resource-group  wocapp --name wocwebapi --settings EnvDbConnection='Server=tcp:wocsqlserver.database.windows.net,1433;Database=wocsqldb;User ID=marcomaechler;Password=wocdev012*;Encrypt=true;Connection Timeout=30;' --connection-string-type SQLServer
az webapp config appsettings set --name wocwebapi --resource-group wocapp --settings ASPNETCORE_ENVIRONMENT="Production"
az webapp config appsettings set --name WoCWebApi --resource-group wocapp --settings FLAVOR="API"
```

Nun sind alles benötigten Azure Elemente aufgesetzt. So siehts im Portal aus:

[Bild 1]: documentationimages/azureressourcegroup.png
![Alt-Text][Bild 1]

Das suffix mirror wurde hier nur eingeführt, um den ganzen Ablauf nochmals durchzutesten und zu dokumentieren. 

## Deployment

### Vorbereitungen

#### Multi Projects deployment (Da wir gleichzeitig 2 Apps Deployen wollen, eine Angular Frontent App und eine API App)

Wir haben in unserer "Solution" ja zwei Projekte. Angular und das dotnet core Web-api.
Das deployment dieser beiden projekte auf Azure App Service ist gar nicht so trivial. Es gibt auch verschiedene Approaches.
Ich wähle jetzt den folgenden, un versuche diesen umzusetzen.
Wir haben ein .deployment file, welches auf das deploy.cmd verweist.
Im deploy.cmd haben wir eine Entscheidung, ob wir das Web-api oder das angular projekt deployen möchten.
Die Entscheidung fällt aufgrund einer AppSettings variablen, die in der entsperechenden Web App unter dem App Service gesetzt wird.
Also die Variable heisst zB. "FLAVOR" und kann den Inhalt "WebApi" oder "NG" haben.

Auf Grund dieser Entscheidung wird dann ein weiteres deplyo..cmd aufgerufen. Entweder deploy.api.cmd, oder deploy.ng.cmd.
Das deploy.api.cmd ist von einem erfolgreichen Kudu deployment kopiert.

Für das deploy.ng.cmd suche ich ein Beispiel im Web.
(zB. dieses hier https://dotnetthoughts.net/deploying-your-angular-app-to-azure/)

##### .deployment

Dies verweisst  auf deploy.cmd

##### deploy.cmd

Hier hat es eine Weiche basierend auf der Environment variable FLAVOR, welche in den appsettings der entsprechenden WebApps gesetzt wird.
Also FLAVOR="API" für woc.web-api, und FLAVOR="NG" für woc.ng

#### deploy.api.cmd

das deployment script für api. Die source wurde von Kudu aus einer laufenden app kopiert.

##### deploy.ng.cmd

das deployment script für ng. Die source kommt aus dem web.

#### Angular deployment webserver

Da Angular eine Singlepage application ist, muss der webserver so konfiguriert werden, dasss wenn direkt eine Route eingegeben wird, 
also zB. https://www.url.com/project Dass dann auf das root verzeichnis geredirected wird (/). weil der server keine resource unter /project hat. davon weiss nur die Angular app auf dem client.

Ausserdem könnte es noch probleme mit CORS geben. Das sollte in der api applikation gehandelt werden.

##### correct node npm version

az webapp config appsettings set --name WoCAppNg --resource-group WocResourceGroup --settings WEBSITE_NODE_DEFAULT_VERSION="8.9.4"

#### GitHub SSH Key

Um aus Azure direkt auf unser DXC GitHub zugreifen zu können muss im GitHub ein SSH Key für den User generiert werden, der das Deploying macht. Dazu auf User/Settings. Dort füt den User einen SSH Key generieren.

[Bild 2]: documentationimages/githubssh.png
![Alt-Text][Bild 2]

Die gesamte GitHub Url für das Deployment lautet dann folgendermassen:

https://mmaechler:0c6550b40988bf421ea78fc4e843ccf5ee05bacf@github.dxc.com/Web-App-Development/WoCSrc.git

### Azure Deployment Initial

Im Azure für beide Apps folgendermassen das Deployment Initialisieren:
Unter Bereitstellung External wählen. (Da unser Code auf einem FirmenGit sind)

[Bild 3]: documentationimages/azurecd.png
![Alt-Text][Bild 3]

App Service-Kudu-Buildserver wählen

[Bild 4]: documentationimages/azurecd2.png
![Alt-Text][Bild 4]

Als Repositry oben erstellte Git Url einfügen.
Brand ist "master"

[Bild 5]: documentationimages/azurecd3.png
![Alt-Text][Bild 5]

Fertigstellen drücken und dann beginnt das Deployment.
Das Deployment läuft eine ganze Weile. Nach Abschluss steht die Meldung "Erfolgreich"

[Bild 6]: documentationimages/azurecd4.png
![Alt-Text][Bild 6]

Wenn beide AppServices erfogleich deployed wurden ist die Woc App ready und kann unter folgender URL aufgerufen werden:

https://wocwebng.azurewebsites.net

[Bild 7]: documentationimages/wocweb.png
![Alt-Text][Bild 7]

### Continous development in Azure einrichten.

Im letzten Schritt muss noch konfirguriert werden, dass bei einem Commit ins GitHub automatisch ein Deployment auf Azure ausgeführt wird.
Dazu müssen in GitHub WebHooks definiert werden.
Dazu unter Settings, Hooks für jede der 2 Apps einen WebHook Eintrag hinzufügen:

[Bild 8]: documentationimages/githubhooks.png
![Alt-Text][Bild 8]


Die URLs sind
https://marcomaechler:wocdev012@wocwebapi.scm.azurewebsites.net/deploy
https://marcomaechler:wocdev012@wocwebng.scm.azurewebsites.net/deploy

Als Content Typ Json wählen.

Das wars.
Nach dieser Configuration wird jedesmal wenn über Git ein Commit ausgeführt wird die neues Version automatisch deployed.
