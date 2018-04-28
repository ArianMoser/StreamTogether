"use strict";

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mysql = require("mysql");


var call = module.exports = {
  //----------------------SELECT----------------------//
  selectUserByUsername: function selectUserByUsername(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten.username);
    var query = "SELECT * from user WHERE username= " + mysql.escape(dieNutzerDaten.username) + ";";
    console.log(query);
    connection.query(query, function (err, rows, fields) {
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
  selectUserById: function selectUserById(res, dieNutzerDaten, connection) {
    var query = "SELECT * from user WHERE id= " + mysql.escape(dieNutzerDaten.id) + ";";
    console.log(query);
    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Query selectUserByUsername succesfully executed: ", rows);
      res.send(rows);
    });
  },
  selectUserAndRoomByUsername: function selectUserAndRoomByUsername(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten.username);
    var query = "SELECT * from user,room WHERE username= " + mysql.escape(dieNutzerDaten.username) + " AND room.ID = user.room_id;";
    console.log(query);
    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Query selectUserAndRoomByUsername succesfully executed: ", rows);
      res.send(rows);
    });
    //AUF SICHERHEIT DER EINGEGEBENEN SACHEN NOCH PRÜFEN MYSQLI STRING UND SO DIESER SCHEIß!
  },
  selectUserByUsernameOrEmail: function selectUserByUsernameOrEmail(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten);
    var query = "SELECT * from user WHERE username= " + mysql.escape(dieNutzerDaten.username) + " OR email= " + mysql.escape(dieNutzerDaten.email) + " ;";
    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Query selectUserByUsernameOrEmail succesfully executed: ", rows);
      res.send(rows);
    });
  },
  selectUserByEmail: function selectUserByEmail(res, dieNutzerDaten, connection) {
    var query = "SELECT * from user WHERE email= " + mysql.escape(dieNutzerDaten.email) + " ;";
    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Query selectUserByEmail succesfully executed: ", rows);
      res.send(rows);
    });
  },
  selectRooms: function selectRooms(res, dieNutzerDaten, connection) {
    /*const query =
      "SELECT * from room ;";*/
    var query = "SELECT room.id, room.title, room.description, room.password, room.thumbnail, room.creator, room.hashedValue, COUNT(user.ID) as 'ActiveUser'" + " FROM `room`, user" + " WHERE room.id = user.room_id" + " GROUP BY room.ID" + " ORDER BY count(user.ID) desc";
    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Query selectRooms succesfully executed: ", rows);
      res.send(rows);
    });
  },
  selectRoomById: function selectRoomById(res, dieNutzerDaten, connection) {
    var query = "SELECT * from room WHERE ID= " + mysql.escape(dieNutzerDaten.id) + " ;";
    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Query selectRoomById succesfully executed: ", rows);
      res.send(rows);
    });
  },
  selectRoomByUserId: function selectRoomByUserId(res, dieNutzerDaten, connection) {
    var query = 'SELECT room.ID, room.title, user.username as "Ersteller", room.description, room.password FROM room, user WHERE user.room_id = room.ID AND user.ID = ' + mysql.escape(dieNutzerDaten.userId) + " ;";
    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Query selectRoomByUserId succesfully executed: ", rows);
      res.send(rows);
    });
  },
  selectRoomHashedValue: function selectRoomHashedValue(res, dieNutzerDaten, connection) {
    var query = 'SELECT room.ID, room.title, user.username as "Ersteller", room.description, room.password ' + "FROM room, user " + "WHERE user.ID = room.creator AND " + "room.hashedValue = " + mysql.escape(dieNutzerDaten.hashedValue) + " ;";
    console.log(query);
    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Query selectRoomHashedValue succesfully executed: ", rows);
      res.send(rows);
    });
  },
  selectRoomByTitle: function selectRoomByTitle(res, dieNutzerDaten, connection) {
    var query = "SELECT title, hashedValue, ID FROM `room` WHERE title=" + mysql.escape(dieNutzerDaten.title) + " ;";
    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Query selectRoomByTitle succesfully executed: ", rows);
      res.send(rows);
    });
  },
  selectVideosByRoomId: function selectVideosByRoomId(res, dieNutzerDaten, connection) {
    var query = "SELECT *" + " FROM playlist,video" + " WHERE video.ID = playlist.video_ID AND playlist.room_id = " + mysql.escape(dieNutzerDaten.roomId) + " ORDER BY playlist.Upvotes DESC, Timestamp ASC;";
    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }
      console.log("Query selectVideosByRoomId succesfully executed: ", rows);
      res.send(rows);
    });
  },
  selectVideoByYoutubeId: function selectVideoByYoutubeId(res, dieNutzerDaten, connection) {
    var query = "SELECT ID" + " FROM video" + " WHERE video.youtube_id = " + mysql.escape(dieNutzerDaten.youtubeId) + " ;";
    connection.query(query, function (err, rows, fields) {
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
  insertUser: function insertUser(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten);
    var query = "INSERT INTO user (username, email, password)VALUES (" + mysql.escape(dieNutzerDaten.username) + " , " + mysql.escape(dieNutzerDaten.email) + " , " + mysql.escape(dieNutzerDaten.password) + " );";
    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Number of records inserted: " + rows.affectedRows);
      res.send(rows);
    });
  },
  insertRoom: function insertRoom(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten);
    var query = "INSERT INTO room (title, description, password, creator, hashedValue)VALUES (" + mysql.escape(dieNutzerDaten.title) + " , " + mysql.escape(dieNutzerDaten.description) + " , " + mysql.escape(dieNutzerDaten.password) + " , " + mysql.escape(dieNutzerDaten.creator) + " , " + mysql.escape(dieNutzerDaten.hashedValue) + " );";
    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Number of records inserted: " + rows.affectedRows);
      res.send(rows);
    });
  },
  insertVideo: function insertVideo(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten);
    var query = "INSERT INTO video (youtube_id, title, description, thumbnail_url, channel_id, channel_name, user_id)VALUES (" + mysql.escape(dieNutzerDaten.videoId) + " , " + mysql.escape(dieNutzerDaten.videoTitle) + " , " + mysql.escape(dieNutzerDaten.videoDescription) + " , " + mysql.escape(dieNutzerDaten.videoThumbnailUrl) + " , " + mysql.escape(dieNutzerDaten.channelId) + " , " + mysql.escape(dieNutzerDaten.channelName) + " , " + mysql.escape(dieNutzerDaten.userName) + " );";
    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Number of records inserted: " + rows.affectedRows);
      res.send(rows);
    });
  },
  insertPlaylist: function insertPlaylist(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten);
    var query = "INSERT INTO playlist (room_ID, video_ID)VALUES (" + mysql.escape(dieNutzerDaten.roomId) + " , " + mysql.escape(dieNutzerDaten.videoId) + " );";
    connection.query(query, function (err, rows, fields) {
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
  updateUserPassword: function updateUserPassword(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten);
    var query = "Update `user`" + " SET `password`=" + mysql.escape(dieNutzerDaten.passwordNew) + " WHERE `ID`=" + mysql.escape(dieNutzerDaten.id) + " ;";
    console.log(query);
    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Number of records updated: " + rows.affectedRows);
      res.send(rows);
    });
  },

  updateUserRoomId: function updateUserRoomId(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten);
    var query = "Update `user`" + " SET `room_id`=" + mysql.escape(dieNutzerDaten.roomId) + " WHERE `username`=" + mysql.escape(dieNutzerDaten.username) + " ;";
    console.log(query);
    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Number of records updated: " + rows.affectedRows);
      res.send(rows);
    });
  },
  updateUpVotes: function updateUpVotes(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten);
    var query = "Update `playlist`" + " SET `Upvotes`=`Upvotes` + " + mysql.escape(dieNutzerDaten.voteValue) + " WHERE `room_ID`=" + mysql.escape(dieNutzerDaten.roomId) + " AND `video_ID`=" + mysql.escape(dieNutzerDaten.videoId) + " ;";
    console.log(query);
    connection.query(query, function (err, rows, fields) {
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
  deleteUserByID: function deleteUserByID(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten);
    var query = "DELETE FROM `user`" + " WHERE `ID`=" + mysql.escape(dieNutzerDaten.id) + " ;";
    console.log(query);
    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Number of records deleted: " + rows.affectedRows);
      res.send(rows);
    });
  },

  deletePlaylist: function deletePlaylist(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten);
    var query = "DELETE FROM `playlist`" + " WHERE `room_ID`=" + mysql.escape(dieNutzerDaten.roomId) + " AND `video_ID`=" + mysql.escape(dieNutzerDaten.videoId) + " ;";
    console.log(query);
    connection.query(query, function (err, rows, fields) {
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
  createEventDropRoom: function createEventDropRoom(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten);
    var query = "CREATE EVENT dropRoom" + mysql.escape(dieNutzerDaten.roomid) + " ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 1 HOUR" + " DO" + " DELETE FROM room" + " WHERE room.id=" + mysql.escape(dieNutzerDaten.roomid) + ";";
    console.log(query);
    connection.query(query, function (err, rows, fields) {
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
  updateDeleteEvent: function updateDeleteEvent(res, dieNutzerDaten, connection) {
    console.log(dieNutzerDaten);
    var query = "ALTER EVENT dropRoom" + mysql.escape(dieNutzerDaten.roomid) + " ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 1 HOUR" + " DO" + " DELETE FROM room" + " WHERE room.id=" + mysql.escape(dieNutzerDaten.roomid) + ";";
    console.log(query);
    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      console.log("Number of altered events: " + rows.affectedRows);
      res.send(rows);
    });
  }
};
//# sourceMappingURL=database.js.map