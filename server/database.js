const mysql = require('mysql');

var call = module.exports = {
    //----------------------LOGIN----------------------//
    selectUserByUserId: function (res, dieNutzerDaten, connection) {
        console.log("meine Nutzerdaten im Login: ", dieNutzerDaten.username)
        const query = 'SELECT * from user WHERE username="' + dieNutzerDaten.username +'"';
        connection.query(query, function(err, rows, fields) {
            if(err){
                console.log("An error ocurred performing the query.");
                console.log(err)
                return;
            }
        
            console.log("Query succesfully executed: ", rows);
            res.send(rows)
            
        });
                                                                                         //AUF SICHERHEIT DER EINGEGEBENEN SACHEN NOCH PRÜFEN MYSQLI STRING UND SO DIESER SCHEIß!
    },
     //----------------------REGISTER----------------------//
    insertUser: function (res, dieNutzerDaten, connection) {
        console.log(dieNutzerDaten);
        const query = 'INSERT INTO user (username, email, password)VALUES ("'+ dieNutzerDaten.username +'","'+ dieNutzerDaten.email +'","'+ dieNutzerDaten.password+'");';
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

