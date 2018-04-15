const mysql = require('mysql');
import $ from 'jquery';

var call = module.exports = {
    //----------------------SELECT----------------------//
    selectUserByUsername: function (res, dieNutzerDaten, connection) {
        const query = 'SELECT from user WHERE username= "' + mysql.escape(dieNutzerDaten.username) + '";';
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
        const query = 'SELECT * from user WHERE username="' + mysql.escape(dieNutzerDaten.username) +'" OR email="' + mysql.escape(dieNutzerDaten.email) + '";';
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
        const query = 'SELECT * from user WHERE email="' + mysql.escape(dieNutzerDaten.email) + '";';
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
    selectRoomById: function (res, dieNutzerDaten, connection) {
        const query = 'SELECT * from room WHERE ID="' + mysql.escape(dieNutzerDaten.id) + '";';
        connection.query(query, function(err, rows, fields) {
            if(err){
                console.log("An error ocurred performing the query.");
                console.log(err)
                return;
            }

            console.log("Query selectRoomById succesfully executed: ", rows);
            res.send(rows)

        });
    },
    selectRoomByUserId: function (res, dieNutzerDaten, connection) {
        const query = 'SELECT room.ID, room.title, user.username as "Ersteller", room.description, room.password FROM room, user WHERE user.room_id = room.ID AND user.ID = "' + mysql.escape(dieNutzerDaten.userId) + '";';
        connection.query(query, function(err, rows, fields) {
            if(err){
                console.log("An error ocurred performing the query.");
                console.log(err)
                return;
            }

            console.log("Query selectRoomByUserId succesfully executed: ", rows);
            res.send(rows)

        });
    },
    selectVideosByRoomId: function (res, dieNutzerDaten, connection) {
        const query = 'SELECT video.id, video.title, video.description FROM room,playlist,video WHERE room.ID = playlist.room_ID AND video.ID = playlist.video_ID AND room.ID = "' + mysql.escape(dieNutzerDaten.roomId) + '";';
        connection.query(query, function(err, rows, fields) {
            if(err){
                console.log("An error ocurred performing the query.");
                console.log(err)
                return;
            }

            console.log("Query selectRoomByRoomId succesfully executed: ", rows);
            res.send(rows)

        });
    },
     //----------------------INSERT----------------------//
    insertUser: function (res, dieNutzerDaten, connection) {
        console.log(dieNutzerDaten);
        const query = 'INSERT INTO user (username, email, password)VALUES ("'+  mysql.escape(dieNutzerDaten.username) +'","'+  mysql.escape(dieNutzerDaten.email) +'","'+  mysql.escape(dieNutzerDaten.password) + '");';
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
