var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var config = require("./config/dbConfig");
var router = express.Router();

var dbConfig = config.dbConfig;
var executeQuery = function (req,res) {
    //Mssql de bağlantı havuzu açarak bağlantı hata var mı denetliyoruz.
    const pool1 = new sql.ConnectionPool(dbConfig, function (err) {
        if (err) {
            res.send("Veritabanına bağlanma konusunda bir hata aldık! :- " + err);
        }
        else {
            //Request nesnemizi oluşturduk.
    var request = new sql.Request(pool1);
            //prosedür için gerekli parametreleri giriyoruz.
    request.input("name", sql.NVarChar,req.body.name);
    request.input("surname", sql.NVarChar,req.body.name);
            //request i execute ediyoruz kısaca prosedürü çalıştırıyoruz.
    request.execute("SearchBeforeInserting", (err, result)=>{
        if(err){
            res.send("HATAAAA :" +err);
        } else {
            //Burada result.recordset[0].result ifadesi;
            //      result= (dönüş değeri).
            //      recordset= (mssql dönüş json array değeri)
            //      [0]= [burada maalesef mssql sonucu 2 kez dönüyor bundan dolay ilkini alıyoruz]
            //      result= (prosedür içindeki dönüş değerinin json objesi hali)
            res.send(result.recordset[0].result);
        }
    })
}
    });
}

router.post("/",function(req,res){
    executeQuery(req,res);
});

module.exports = router;
