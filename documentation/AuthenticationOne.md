# Authentication
following: https://nexusinno.com/en/using-openidconnect-azure-ad-angular5-webapi-core-angular5-configuration/

Was bei obigem Beispiel vergessen gegangen ist, ist, dass anstatt mit httpClient, der AuthHttpClient verwendet werden muss.
Hier bin ich noch am designen, wie man den Adal Http Call get() am besten in einen get<T>() umwandeln kann.

Folgende Schritte sind verlangt:
 1. setup Active Directory in Azure
 2. npm install adal in angular app
 3. make a authHttpService (ngService)
 4. Angular Auth-callback component erstellen
 4. register the Adal im app.module.ts
 5. ändere calls von httpClient zu authHttpService
 6. definiere ein AuthGuard mit adal (routing)
 7. configuriere geschützte routes mit AuthGuard

 Serverseitig
 * Installieren der verlangten komponenten
 * configurieren der server runtime
 * schützen der controllermethodem mit [Authorize]
