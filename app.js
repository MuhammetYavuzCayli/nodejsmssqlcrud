var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var config = require("./config/dbConfig");
var app = express();
var insert = require('./insert')

app.use(bodyParser.json());

//CORS Middleware 
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

// Server ı oluşturma
var server = app.listen(process.env.PORT || 7000, function () {
    var port = server.address().port;
    console.log("Uygulama başlatıldı ....", port);
});

var dbConfig = config.dbConfig;
var executeQuery = function (req,res,query,requestHeader) {
    //Mssql de bağlantı havuzu açarak bağlantı hata var mı denetliyoruz.
    const pool1 = new sql.ConnectionPool(dbConfig, function (err) {
        if (err) {
            res.send("Veritabanına bağlanma konusunda bir hata aldık! :- " + err);
        }
        else {
            // Request nesnesi oluşturma kısmı
            var request = new sql.Request(pool1);
            // Veritabanında yapılacak sorgunun işlenmesi ve dönecek cevabın döndürülmesi 
            request.query(query, function (err, recordset) {
                if(recordset["rowsAffected"] == 0){
                    res.send(404,"Böyle bir kullanıcı yok!!");
                }
                else if (err) {
                    console.log("Error while querying database :- " + err);
                    res.send(404,err);
                }
                else {
                    switch(requestHeader){
                        case "GET": 
                        res.status(200).send(recordset["recordset"]); break;
                        case "INSERT":
                        res.status(200).send("kullanıcı eklendi.."); break;
                        case "UPDATE":
                        res.status(200).send("kullanıcı güncellendi.."); break;
                        case "DELETE":
                        res.status(200).send("kullanıcı silindi"); break;
                        default: 
                        res.status(404);
                    }
                }
            });
        }
    });
}

//GET API ÇALIŞIYOR
app.get("/api/user", function (req, res) {
    var query = "select * from [Users]";
    executeQuery(req,res, query,"GET");
});
//GET API TOP ÇALIŞIYOR
app.get("/api/user/:number", function (req, res) {
    var top1 = req.params.number;
    var query = "select top("+top1+")* from [Users]";
    executeQuery(req,res, query,"GET");
});
//Prosedürle beraber kullanıcı ekleme
app.use("/api/sp/user",insert);

//POST API ÇALIŞIYOR
app.post("/api/post/user", function (req, res) {
    var name = req.body.name;
    var surname = req.body.surname;
    var isvalid = req.body.isvalid;
    //console.log("Eklenecek isim: " +name +" soyisim: "+ surname +" geçerli mi?: "+ isvalid);
    var query = "INSERT INTO [Users] (Name,Surname,IsValid) VALUES ('"+name+"','"+surname+"',"+isvalid+")";
    executeQuery(req,res, query,"INSERT");
});

//PUT API ÇALIŞIYOR
app.put("/api/update/user/:id", function (req, res) {
    var userId = req.params.id;
    var name = req.body.name;
    var surname = req.body.surname;
    //res.send("Güncellenecek Id: " +userId +" isim: "+ name +" soyisim: "+ surname);
    var query = `UPDATE [Users] SET Name= '${name}' , Surname= '${surname}'  WHERE Id= '${userId}'`;
    executeQuery(req,res, query,"UPDATE");
});

// DELETE API ÇALIŞIYOR
app.delete("/api/delete/user/:id", function (req, res) {
    var delete1 = req.params.id;
    var query = "DELETE FROM [Users] WHERE Id ="+delete1;
    executeQuery(req,res, query,"DELETE");
});
