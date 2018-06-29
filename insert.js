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
    var request = new sql.Request(pool1);
    request.input("name", sql.NVarChar,req.body.name);
    request.input("surname", sql.NVarChar,req.body.name);
    request.execute("SearchBeforeInserting", (err, result)=>{
        if(err){
            res.send("HATAAAA :" +err);
        } else {
            res.send(result.recordset[0].result);
        }
    })
}
    });
}

router.post("/",function(req,res){
    //res.send("HEBELE");
    executeQuery(req,res);
});

module.exports = router;