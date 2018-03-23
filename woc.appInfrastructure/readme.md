# Infrastructure
Die Infrastructure implementiert den Zugriff auf Systemresourcen für den Application und den Domain Layer.

# Repositories
Der InfrastructurLayer bewerkstelligt den Datenbankzugriff für den Application- / und den DomainLayer. Dabei ist das Interface im Domainlayer implementiert. Der Infrastrukturlayer referenziert auch den DomainLayer (Implementation)
Ein repository kann auch andere Repositories als Dependencies aufnehmen.

## dbaccess
Die datenbank schicht wird mit __Dapper__ implementiert

# Andere Resourcen
Aber auch auf andere Resourcen wie Mailserver, FileServer, ... wird von hier aus zugegriffen.

# Dtos
Dtos sind Data Transfer Objects. diese sind einfach Felder ohne Logic. sie werden zB. in der UI-Schicht verwendet.

Ursprünglich war geplant, Dtos im DomainLayer zu implementieren/definieren. Dies hätte aber zur folge gehabt, dass es ein extra DomainContract .dll gebraucht hätte. Darauf wollte ich verzichten und habe die Dtos hier platziert, weil auch der InfrastrukturLayer im webApi referenziert werden kann. Das ist aber etwas das sich auch noch ändern kann.


# Example

```
public IDbConnection OpenConnection
        {
            get
            {
                var sqlConnection = new SqlConnection(connectionString);
                try {
                    sqlConnection.Open();
                }
                catch(Exception ex) {
                    string s = ex.Message;
                }
                
                return sqlConnection;
            }
        }

public IList<Employee> GetAll()
        {
            using(var c = this.OpenConnection){
                var r = c.Query<Employee>("SELECT Name FROM Employee").ToList();
                return r;
            }
        }        
```
