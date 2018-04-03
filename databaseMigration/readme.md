Inspiriert von hier:
https://www.kenneth-truyers.net/2016/06/02/database-migrations-made-simple/


# Introduction
Dies ist ein migrations Tool für die Db.
Es funktioniert so, dass es in der Db eine Tabelle gibt, wo die ausgeführten scripts aufgelistet sind.
Daneben besteht ein Folder mit scripts. Die scripts die im Folder aber nicht in der Tabelle sind, werden ausgefürht und in die Tabelle eingefügt.

# Connection String
Der Connectionstring wird aus den user-secrets ausgelesen, wie für den Rest des Projekts auch. Wir wollen den Connectionstring nicht im Git.

mit

```
string conf = Configuration["secretConnectionstring"] 
```
im dontet core code.

```
dotnet user-secrets list
```
Der Key für die user-secrets ist aber im config file abgelegt.

# Project creation
``` 
// create project
mkdir databaseMigration 
cd databaseMigration
dotnet new console

// add dapper
dotnet add package Dapper --version 1.50.4

```



