# NodeJs ile Sql Server ın Bir Veritabanı üzerinde CRUD işlemleri 
NodeJs i api olarak kullanmayı sevenler için gelsin :)
## Kurulum ve ilk çalıştırma
Öncelikle kurulum yapılması gereken programlar:

* [SQL Server](https://www.microsoft.com/en-US/download/details.aspx?id=54284)
* [NodeJs](https://nodejs.org/en/)
* Sevdiğiniz bir kodlama editörü (ben Visual Studio Code kullanıyorum.)


### Gerekli kurulumlara sahipseniz yapacaklarınız gayet basittir :) 
* Dosyaları indirin. 
* sql dosyasını mssql de çalıştırın ve denemDB yi kurun zaten tek tablo 
* js dosyalarını bi klasöre atın fakat dbConfig.js deki 

```
user : 'kendi mssql user'ınız',
password: 'kendi mssql password'ünüz' 
``` 
olacak şekilde düzenleyip dbConfig.js dosyasını attığınız klasör hiyerarşinize göre app.js içindeki
``` 
var config = require("./config/dbConfig"); 
``` 
satırını düzenleyin.
* package.json dosyanızdaki yüklemeniz gereken kütüphaneleri yükleyin.
* proje dosyanız tabanlı çalışacak olan komut istemcinizde (cmd, vs code terminal vb.) 
* Son olarak 
### Çalıştırın :)
```
nodemon app.js
``` 
