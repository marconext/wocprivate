# Introduction
Dieses Dokument soll einige patterns und Vorgehensweisen erläutern.

# Service requests Observable
Service Methoden sollen Observables zurückgeben.
Die Alternative wären Promises.

Vorteile Promises:
* Einfacher handzuhaben

Vorteile Observables:
* Mehr Möglichkeiten.
* wie Retry, Abort, Unsubscribe
* Async Pipe in HtmlTemplates

Je nach dem wird noch entschieden, ob beides möglich sein soll.

# Secrets
Geheimnisse wie passworter für Connection strings, sollten nie im Source Code eingecheckt werden!
Das ist ein grosses Sicherheitsrisiko.
Siehe hier
https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?tabs=visual-studio

