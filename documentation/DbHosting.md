die folgenden Commandos sind für das erstellen einer db.
Vorgängig muss ein DB Server erstellt werden, sofern nicht schon vorhnanden.
Achtung, das korrekte Passowrt einsetzen.
Und auch die korrekte Resource Group


```
az sql server create --name wocsqldbserver --resource-group WoCResourceGroup --location "West Europe" --admin-user rschindele --admin-password wocdbserver*2018

az sql server firewall-rule create --resource-group WoCResourceGroup --server wocsqldbserver --name AllowAllIp --start-ip-address 0.0.0.0 --end-ip-address 0.0.0.0

az sql db create --resource-group WoCResourceGroup --server wocsqldbserver --name wocsqldb --service-objective S0 
```
