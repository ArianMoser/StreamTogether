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
  selectUserById: function(res, dieNutzerDaten, connection) {
    const query =
      "SELECT * from user WHERE id= " +
      mysql.escape(dieNutzerDaten.id) +
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
      "SELECT *" +
      " FROM playlist,video" +
      " WHERE video.ID = playlist.video_ID AND playlist.room_id = " +
      mysql.escape(dieNutzerDaten.roomId) +
      " ORDER BY playlist.Upvotes DESC, Timestamp ASC;";
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
  selectVideoByYoutubeId: function(res, dieNutzerDaten, connection) {
    const query =
      "SELECT ID" +
      " FROM video" +
      " WHERE video.youtube_id = " +
      mysql.escape(dieNutzerDaten.youtubeId) +
      " ;";
    connection.query(query, function(err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }
      console.log("Query selectVideoByYoutubeId succesfully executed: ", rows);
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
  insertVideo: function(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten);
    const query =
      "INSERT INTO video (youtube_id, title, description, thumbnail_url, channel_id, channel_name)VALUES (" +
      mysql.escape(dieNutzerDaten.videoId) +
      " , " +
      mysql.escape(dieNutzerDaten.videoTitle) +
      " , " +
      mysql.escape(dieNutzerDaten.videoDescription) +
      " , " +
      mysql.escape(dieNutzerDaten.videoThumbnailUrl) +
      " , " +
      mysql.escape(dieNutzerDaten.channelId) +
      " , " +
      mysql.escape(dieNutzerDaten.channelName) +
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
  insertPlaylist: function(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten);
    const query =
      "INSERT INTO playlist (room_ID, video_ID)VALUES (" +
      mysql.escape(dieNutzerDaten.roomId) +
      " , " +
      mysql.escape(dieNutzerDaten.videoId) +
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
  updateUpVotes: function(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten);
    const query =
      "Update `playlist`" +
      " SET `Upvotes`=`Upvotes` + " +
      mysql.escape(dieNutzerDaten.voteValue) +
      " WHERE `room_ID`=" +
      mysql.escape(dieNutzerDaten.roomId) +
      " AND `video_ID`=" +
      mysql.escape(dieNutzerDaten.videoId) +
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

  deletePlaylist: function(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten);
    const query =
      "DELETE FROM `playlist`" +
      " WHERE `room_ID`=" +
      mysql.escape(dieNutzerDaten.roomId) +
      " AND `video_ID`=" +
      mysql.escape(dieNutzerDaten.videoId) +
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
      "CREATE EVENT dropRoom" +
      mysql.escape(dieNutzerDaten.roomid) +
      " ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 1 HOUR" +
      " DO" +
      " DELETE FROM room" +
      " WHERE room.id=" +
      mysql.escape(dieNutzerDaten.roomid) +
      ";";
    console.log(query);
    connection.query(query, function(err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Number of created events: " + rows.affectedRows);
      res.send(rows);
    });
  },
  //------------------alters the drop room event------------------//
  updateDeleteEvent: function(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten);
    const query =
      "ALTER EVENT dropRoom" +
      mysql.escape(dieNutzerDaten.roomid) +
      " ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 1 HOUR" +
      " DO" +
      " DELETE FROM room" +
      " WHERE room.id=" +
      mysql.escape(dieNutzerDaten.roomid) +
      ";";
    console.log(query);
    connection.query(query, function(err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Number of altered events: " + rows.affectedRows);
      res.send(rows);
    });
  }
});
