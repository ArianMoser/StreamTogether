const mysql = require("mysql");
import $ from "jquery";

var call = (module.exports = {
  //----------------------SELECT----------------------//
  selectUserByUsername: function(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten.username);
    const query =
      "SELECT * from user WHERE username= " +
      mysql.escape(dieNutzerDaten.username) +
      ";";
    console.log(query);
    connection.query(query, function(err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Query selectUserByUsername succesfully executed: ", rows);
      res.send(rows);
    });
    //AUF SICHERHEIT DER EINGEGEBENEN SACHEN NOCH PRÜFEN MYSQLI STRING UND SO DIESER SCHEIß!
  },
  selectUserAndRoomByUsername: function(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten.username);
    const query =
      "SELECT * from user,room WHERE username= " +
      mysql.escape(dieNutzerDaten.username) +
      " AND room.ID = user.room_id;";
    console.log(query);
    connection.query(query, function(err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log(
        "Query selectUserAndRoomByUsername succesfully executed: ",
        rows
      );
      res.send(rows);
    });
    //AUF SICHERHEIT DER EINGEGEBENEN SACHEN NOCH PRÜFEN MYSQLI STRING UND SO DIESER SCHEIß!
  },
  selectUserByUsernameOrEmail: function(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten);
    const query =
      "SELECT * from user WHERE username= " +
      mysql.escape(dieNutzerDaten.username) +
      " OR email= " +
      mysql.escape(dieNutzerDaten.email) +
      " ;";
    connection.query(query, function(err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log(
        "Query selectUserByUsernameOrEmail succesfully executed: ",
        rows
      );
      res.send(rows);
    });
  },
  selectUserByEmail: function(res, dieNutzerDaten, connection) {
    const query =
      "SELECT * from user WHERE email= " +
      mysql.escape(dieNutzerDaten.email) +
      " ;";
    connection.query(query, function(err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Query selectUserByEmail succesfully executed: ", rows);
      res.send(rows);
    });
  },
  selectRooms: function(res, dieNutzerDaten, connection) {
    /*const query =
      "SELECT * from room ;";*/
    const query =
      "SELECT room.id, room.title, room.description, room.password, room.thumbnail, room.creator, room.hashedValue, COUNT(user.ID) as 'ActiveUser'" +
      " FROM `room`, user" +
      " WHERE room.id = user.room_id" +
      " GROUP BY room.ID" +
      " ORDER BY count(user.ID) desc";
    connection.query(query, function(err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Query selectRooms succesfully executed: ", rows);
      res.send(rows);
    });
  },
  selectRoomById: function(res, dieNutzerDaten, connection) {
    const query =
      "SELECT * from room WHERE ID= " + mysql.escape(dieNutzerDaten.id) + " ;";
    connection.query(query, function(err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Query selectRoomById succesfully executed: ", rows);
      res.send(rows);
    });
  },
  selectRoomByUserId: function(res, dieNutzerDaten, connection) {
    const query =
      'SELECT room.ID, room.title, user.username as "Ersteller", room.description, room.password FROM room, user WHERE user.room_id = room.ID AND user.ID = ' +
      mysql.escape(dieNutzerDaten.userId) +
      " ;";
    connection.query(query, function(err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Query selectRoomByUserId succesfully executed: ", rows);
      res.send(rows);
    });
  },
  selectRoomHashedValue: function(res, dieNutzerDaten, connection) {
    const query =
      'SELECT room.ID, room.title, user.username as "Ersteller", room.description, room.password ' +
      "FROM room, user " +
      "WHERE user.ID = room.creator AND " +
      "room.hashedValue = " +
      mysql.escape(dieNutzerDaten.hashedValue) +
      " ;";
    console.log(query);
    connection.query(query, function(err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Query selectRoomHashedValue succesfully executed: ", rows);
      res.send(rows);
    });
  },
  selectRoomByTitle: function(res, dieNutzerDaten, connection) {
    const query =
      "SELECT title, hashedValue, ID FROM `room` WHERE title=" +
      mysql.escape(dieNutzerDaten.title) +
      " ;";
    connection.query(query, function(err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Query selectRoomByTitle succesfully executed: ", rows);
      res.send(rows);
    });
  },
  selectVideosByRoomId: function(res, dieNutzerDaten, connection) {
    const query =
      "SELECT video.id, video.title, video.description, video.user_id" +
      " FROM playlist,video" +
      " WHERE video.ID = playlist.video_ID AND playlist.room_id = " +
      mysql.escape(dieNutzerDaten.roomId) +
      " ;";
    connection.query(query, function(err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }
      console.log("Query selectVideosByRoomId succesfully executed: ", rows);
      res.send(rows);
    });
  },
  //----------------------INSERT----------------------//
  insertUser: function(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten);
    const query =
      "INSERT INTO user (username, email, password)VALUES (" +
      mysql.escape(dieNutzerDaten.username) +
      " , " +
      mysql.escape(dieNutzerDaten.email) +
      " , " +
      mysql.escape(dieNutzerDaten.password) +
      " );";
    connection.query(query, function(err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Number of records inserted: " + rows.affectedRows);
      res.send(rows);
    });
  },
  insertRoom: function(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten);
    const query =
      "INSERT INTO room (title, description, password, creator, hashedValue)VALUES (" +
      mysql.escape(dieNutzerDaten.title) +
      " , " +
      mysql.escape(dieNutzerDaten.description) +
      " , " +
      mysql.escape(dieNutzerDaten.password) +
      " , " +
      mysql.escape(dieNutzerDaten.creator) +
      " , " +
      mysql.escape(dieNutzerDaten.hashedValue) +
      " );";
    connection.query(query, function(err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Number of records inserted: " + rows.affectedRows);
      res.send(rows);
    });
  },
  //----------------------update----------------------//
  updateUserPassword: function(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten);
    const query =
      "Update `user`" +
      " SET `password`=" +
      mysql.escape(dieNutzerDaten.passwordNew) +
      " WHERE `ID`=" +
      mysql.escape(dieNutzerDaten.id) +
      " ;";
    console.log(query);
    connection.query(query, function(err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Number of records updated: " + rows.affectedRows);
      res.send(rows);
    });
  },

  updateUserRoomId: function(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten);
    const query =
      "Update `user`" +
      " SET `room_id`=" +
      mysql.escape(dieNutzerDaten.roomId) +
      " WHERE `username`=" +
      mysql.escape(dieNutzerDaten.username) +
      " ;";
    console.log(query);
    connection.query(query, function(err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Number of records updated: " + rows.affectedRows);
      res.send(rows);
    });
  },
  //-------------------------delete----------------------//
  deleteUserByID: function(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten);
    const query =
      "DELETE FROM `user`" +
      " WHERE `ID`=" +
      mysql.escape(dieNutzerDaten.id) +
      " ;";
    console.log(query);
    connection.query(query, function(err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Number of records deleted: " + rows.affectedRows);
      res.send(rows);
    });
  },

  //--------------------create event drop room-------------------//
  createEventDropRoom: function(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten);
    const query =
      "CREATE EVENT dropRoom" + mysql.escape(dieNutzerDaten.roomid) +
      " ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 1 HOUR"  +
      " DO" +
      " DELETE FROM room" +
      " WHERE room.id=" + mysql.escape(dieNutzerDaten.roomid) + ";";
    console.log(query);
    connection.query(query, function(err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Number of records deleted: " + rows.affectedRows);
      res.send(rows);
    });
  }
});
