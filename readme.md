# Introducton
Dies ist Woc!

Für die Platform wurden ein paar Annahmen gemacht, die hier erläutert werden sollen.

# Todos
* Unit Tests
* CSS Framework
* Logging
* Authentication
* Authorization
* Exceptionhandling
* Web Security  CORS, XSS, Anti Request Forgery, ...
* HTTPS

# IDE
Als IDE soll Visual Studio Code verwendet werden. Die Gründe dazu sind:
* Open Source
* gratis
* light weight zum Installieren
* Wird in vielen online Tutorials und Youtube Videos verwendet
* Ist sehr modern
* läuft auf allen Platformen
* hat viele plugins

Es ermöglicht vielen Mitarbeitern ohne Lizenzen am Projekt mitzuarbeiten.

Wie sich die IDE für das vorliegende Projekt eignet muss sich natürlich noch zeigen. Aber wir starten damit.

# Code Repository
Wir verwenden Git als code Repository. Dies vorallem weil Git ein defacto Standard in DXC sein soll.
Eine Alternative, die mir persönlich noch gefallen würde ist GitLab. GitLab beinhaltet bereits eine CI infrastruktur.

# Hosting
Das Hosting ist im Moment noch nicht klar. Zum Start soll die App auf einer Linux VM in Azure laufen. Das kann sich aber schon schnell ändern, da die Hosting Frage in Abklärung ist.

# DB
Wir brauchen eine DB. Meine Entscheidung ist auf SQL Server gefallen, da dieser in Azure günstig zu haben ist. 5.-- / Monat für günstigste Variante.

Alternativen würden bis jetzt alle mehr kosten.
Des weiteren spricht für SQL Server bzw eine Relationale DB: 
- Mein persönliches Knowhow.
- NoSql kann nicht gut mit referenzen umgehen
- NoSql hat keine Transaktionen
- Im Enterprise Umfeld werden SQL Datenbanken verwendet, und das vorliegende Projekt soll ja auch als schulungsprojekt dienen..............
