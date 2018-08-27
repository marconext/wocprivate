# Data Access
Da ein Domain Driven Design verwendet werden soll, wird der Datenbank zugriff generell über Repositories gemacht. Im repository werden aus den DatenRows der Db die Entities erstellt. Per Aggregate Root gibt es ein Repository. Ein repository hat immer sehr spezialisierte methoden. es gibt nicht einfach generische selects oder updates.
Also nicht saveUser(), sondern eher changeAddress()

## Dapper
Der Daten layer wird mit hilfe von der library Dapper gemacht.
Dapper ist ein light-weight orm. Die Sql Kommandows müssen per Sql Text übergeben werden.
Es können Parameter eingesetzt werden.
Dapper hilft bei der Connection, Transaktinen und beim mappen der zurückgelesenen daten in Objekte.

## Entity Framework
Entity Framework besteht auch im dotnet core framewrok (efdbc). 
__efdbc__ ist auf basis von __EF6__ neu erstellt worden. Es wurden ein paar neue wichtige Features hinzugefügt, aber es fehlen auch immer noch ein paar wichtige features. Deswegen möchte ich mich nicht auf efdbc einlassen. Seit Jahren stolpere ich über blogs wo es Probleme gegeben hat. Vorallem im Bereich von DDD.

Ich könnte mir aber vorstellen, efdbc im Rahmen von einem selber gebauten __IdentityServer__ einzusetzten, weil das von haus aus vom dontet core so implementiert ist.

## Transaction Scope
Unglücklicherweise habe ich es nicht geschafft, den Transaction Code einzusetzen.
Dies wäre der Weg den ich gehen würde:

```
using(transactionScope = new TransactionScope())
{
    try
    {
        using(dbconnection = new Dbconnection(connectionstring))
        {
            exec("..",..);
            exec("..", ..)
        }
        transactionScope.Complete()
    }
    catch (TransactionAbortedException ex)
    {
        //writer.WriteLine("TransactionAbortedException Message: {0}", ex.Message);
    }
    catch (ApplicationException ex)
    {
        //writer.WriteLine("ApplicationException Message: {0}", ex.Message);
    }
}
```
```
Exec()
```
könnten auch funktionsaufrufe mit code wie:
```
        using(dbconnection = new Dbconnection(connectionstring))
        {
            exec("..",..);
            exec("..", ..)

        }
```
sein.
Aber leider erhalte ich eine Fehlermeldung: "Enlisting in Ambient transactions is not supported."
Und das hat mit den verschiedenen sql.dll versionen zu tun.
