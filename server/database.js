const mysql = require('mysql');

var call = module.exports = {
    //----------------------LOGIN----------------------//
    meineFunktion: function (res, dieNutzerDaten, connection) {
        console.log("meine Nutzerdaten im Login: ", dieNutzerDaten.username)
        const query = 'SELECT * from name WHERE Vorname="' + dieNutzerDaten.username +'"';
        connection.query(query, function(err, rows, fields) {
            if(err){
                console.log("An error ocurred performing the query.");
                console.log(err)
                return;
            }
        
            console.log("Query succesfully executed: ", rows);
            res.send(rows)
            
        });

    },
}

