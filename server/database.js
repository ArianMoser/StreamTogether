const mysql = require('mysql');
import $ from 'jquery';

var call = module.exports = {
    //----------------------SELECT----------------------//
    selectUserByUsername: function (res, dieNutzerDaten, connection) {
        const query = 'SELECT * from user WHERE username=' + mysql.escape(dieNutzerDaten.username);
        connection.query(query, function(err, rows, fields) {
            if(err){
                console.log("An error ocurred performing the query.");
                console.log(err)
                return;
            }
        
            console.log("Query selectUserByUsername succesfully executed: ", rows);
            res.send(rows)
            
        });
                                                                                         //AUF SICHERHEIT DER EINGEGEBENEN SACHEN NOCH PRÜFEN MYSQLI STRING UND SO DIESER SCHEIß!
    },
    selectUserByUsernameOrEmail: function (res, dieNutzerDaten, connection) {
        console.log(dieNutzerDaten)
        const query = 'SELECT * from user WHERE username=' + mysql.escape(dieNutzerDaten.username) +' OR email=' + mysql.escape(dieNutzerDaten.email);
        connection.query(query, function(err, rows, fields) {
            if(err){
                console.log("An error ocurred performing the query.");
                console.log(err)
                return;
            }
        
            console.log("Query selectUserByUsernameOrEmail succesfully executed: ", rows);
            res.send(rows)
            
        });
    },
    selectUserByEmail: function (res, dieNutzerDaten, connection) {
        const query = 'SELECT * from user WHERE email=' + mysql.escape(dieNutzerDaten.email);
        connection.query(query, function(err, rows, fields) {
            if(err){
                console.log("An error ocurred performing the query.");
                console.log(err)
                return;
            }
        
            console.log("Query selectUserByEmail succesfully executed: ", rows);
            res.send(rows)
            
        });
    },
     //----------------------INSERT----------------------//
    insertUser: function (res, dieNutzerDaten, connection) {
        console.log(dieNutzerDaten);
        const query = 'INSERT INTO user (username, email, password)VALUES ('+  mysql.escape(dieNutzerDaten.username) +','+  mysql.escape(dieNutzerDaten.email) +','+  mysql.escape(dieNutzerDaten.password) + ');';
        connection.query(query, function(err, rows, fields) {
            if(err){
                console.log("An error ocurred performing the query.");
                console.log(err)
                return;
            }
        
            console.log("Number of records inserted: " + rows.affectedRows);
            res.send(rows);
            
        });

    }

}

