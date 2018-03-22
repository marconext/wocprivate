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