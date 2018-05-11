//--------------------------------Declarations-------------------------------//
const express = require("express");
const http = require("http");
const exp = express();
const bodyParser = require("body-parser");
const next = require("next");
const database = require("./database");
const mysql = require("mysql");
const multer = require("multer");
const uuid = require("uuid/v4");
const server = http.createServer(exp);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const io = require("socket.io")();

//********************CHAT******************/

//Open connection to websocket for chat
const port = 8000;
io.listen(port);
console.log("listening on port ", port);
var rooms = [];
//send the client every <interval> second a message
  // user is connected
io.on("connection", client => {
  // user is disconnected
  client.on("disconnect", event => {
    // default disconnect event
    var message = {
      content: "User is disconnected",
      username: "server",
      timeStamp: Math.floor(Date.now() / 1000)
    };
    io.emit("sendMessageBack", { message });
  });

  // user will leave the room (disconnect or switch page)
  client.on("leaveRoom", messageReceived => {
    console.log("User will disconnect");
    var username = messageReceived.username;
    if (rooms.length != "0") {
      rooms.map(room => {
        // remove user from userlist of other rooms
        console.log("Removing user from list");
        var userlist = room.userlist;
        if (userlist.length != "0") {
          var countUser = room.userlist.length;
          room.userlist = userlist.filter(user => {
            return user !== username;
          }); // removing user from other rooms
          if (countUser != room.userlist.length) {
            console.log("User removed from list");
            //message room that the user disconnected
            var messageDisconnect = {
              content: messageReceived.username + " is disconnected",
              username: "server",
              timeStamp: Math.floor(Date.now() / 1000)
            };
            console.log(room.userlist);
            io.emit("sendMessageBack", {
              message: messageDisconnect,
              userlist: room.userlist
            });
          } //end of if
          console.log(room);
        } //end of if
      });
    } // end of if
  });

  // user authentification
  client.on("authentificate", messageReceived => {
    console.log("User tries to authentificate");
    var username = messageReceived.username;
    var hashedValue = messageReceived.hashedValue;
    var messageUserlist = [];
    var message = {
      content: messageReceived.username + " is connected",
      username: "server",
      timeStamp: Math.floor(Date.now() / 1000)
    };
    var roomAlreadyExists = false;
    if (rooms.length != "0") {
      rooms.map(room => {
        if (room.hashedValue == hashedValue) {
          roomAlreadyExists = true;
          console.log("Room already exists");
          var userlist = room.userlist;
          var userAlreadyJoined = false;
          if (userlist.length != "0") {
            userlist.map(user => {
              if (user == username) {
                userAlreadyJoined = true;
                console.log("User already inside of the userlist");
              }
            }); // end of iteration over userlist
          } //end of if
          if (userAlreadyJoined == false) {
            userlist.push(username);
            room.userlist = userlist;
          } //end of if
          messageUserlist = userlist;
        } else {
          // remove user from userlist of other rooms
          console.log("Removing user from list");
          var userlist = room.userlist;
          if (userlist.length != "0") {
            var countUser = room.userlist.length;
            room.userlist = userlist.filter(user => {
              return user !== username;
            }); //removing user from other rooms
            if (countUser != room.userlist.length) {
              console.log("User removed from list");
              //message room that the user disconnected
              var messageDisconnect = {
                content: messageReceived.username + " is disconnected",
                username: "server",
                timeStamp: Math.floor(Date.now() / 1000)
              };
              io.emit("sendMessageBack", {
                message: messageDisconnect,
                userlist: room.userlist
              });
            } //end of if
            console.log(room);
          } //end of if
        } //end of else
      }); // end of iteration over rooms
    } //end of if
    if (roomAlreadyExists == false) {
      rooms.push({ hashedValue: hashedValue, userlist: [username] });
    }
    io.emit("sendMessageBack", { message: message, userlist: messageUserlist });
  });

  //trigger User to Refresh
  client.on("triggerRefresh", message => {
    console.log("Trigger for refresh received");
    var userlist = [];
    if (rooms.length != "0") {
      rooms.map(room => {
        var userInRoom = false;
        if (room.userlist.length != "0") {
          room.userlist.map(user => {
            if (user == message.username) {
              userInRoom = true;
            } //end of if
          }); // end of iteration userlist
        } //end of if
        if (userInRoom == true) {
          userlist = room.userlist;
        } // end of if
      }); // end of iteration room
    } //end of if
    var messageInfo = {
      content: message.username + message.content,
      username: "server",
      timeStamp: Math.floor(Date.now() / 1000)
    };
    io.emit("sendMessageBack", { message: messageInfo, userlist: userlist });
    io.emit("sendVideoCommand", { message: message, userlist: userlist });
  });

  //send message
  client.on("sendMessage", message => {
    console.log("Received message");
    var userlist = [];
    if (rooms.length != "0") {
      rooms.map(room => {
        var userInRoom = false;
        if (room.userlist.length != "0") {
          room.userlist.map(user => {
            if (user == message.username) {
              userInRoom = true;
            } //end of if
          }); // end of iteration userlist
        } //end of if
        if (userInRoom == true) {
          userlist = room.userlist;
        } // end of if
      }); // end of iteration room
    } //end of if
    io.emit("sendMessageBack", { message: message, userlist: userlist });
  });
});

//********************DATABASE******************/

//Open connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "streamtogether"
});

//********************IMAGE STORAGE******************/

//Setup Multer for uploading files
const storage = multer.diskStorage({
  destination: 'static/public/images/',
  filename: function (req, file, callback) {
    var ext = "";
    switch (file.mimetype) {

      case 'image/jpeg': ext = '.jpeg'; break;
      case 'image/png': ext = '.png'; break;
      default: ext = '';
    }
    callback(null, uuid() + ext);
  }
});
const upload = multer({ storage: storage, limits: {fileSize: 6291456} });

//********************REVERSE PROXY/LINK******************/

exp.use(bodyParser.urlencoded({ extended: false }));
exp.use(bodyParser.json());
app
  .prepare()
  .then(async () => {
    exp.use(express.static("./static/"));

    exp.get("/index", async (req, res) => {
      res.redirect("/");
    });

    exp.get("/", (req, res) => {
      return app.render(req, res, "/index");
    });

    exp.get("/github", async (req, res) => {
      res.redirect("http://github.com/ArianMoser/StreamTogether");
    });

    //if database is connected
    connection.connect(function (err) {
      // in case of error
      if (err) {
        console.log("Database Connection ERROR");
        console.log(err.code);
        console.log(err.fatal);
      } else {
        console.log("Database CONNECTED");

        exp.post("/createRoom", (req, res) => {
          database.insertRoom(res, req.body, connection);
        });
        exp.post("/createEventDropRoom", (req, res) => {
          database.createEventDropRoom(res, req.body, connection);
        });
        exp.post("/createEventDropUser", (req, res) => {
          database.createEventDropUser(res, req.body, connection);
        });
        exp.post("/createVideo", (req, res) => {
          database.insertVideo(res, req.body, connection);
        });
        exp.post("/createPlaylist", (req, res) => {
          database.insertPlaylist(res, req.body, connection);
        });
        exp.post("/deletePlaylist", (req, res) => {
          database.deletePlaylist(res, req.body, connection);
        });
        exp.post("/deleteUser", (req, res) => {
          database.deleteUserByID(res, req.body, connection);
        });
        exp.post("/getuserbyemail", (req, res) => {
          database.selectUserByEmail(res, req.body, connection);
        });
        exp.post("/getUserById", (req, res) => {
          database.selectUserById(res, req.body, connection);
        });
        exp.post("/getuserandroombyusername", (req, res) => {
          database.selectUserAndRoomByUsername(res, req.body, connection);
        });
        exp.post("/getuserbyusername", (req, res) => {
          database.selectUserByUsername(res, req.body, connection);
        });
        exp.post("/login", (req, res) => {
          database.selectUserByUsernameOrEmail(res, req.body, connection);
        });
        exp.post("/register", (req, res) => {
          database.insertUser(res, req.body, connection);
        });
        exp.post("/selectRooms", (req, res) => {
          database.selectRooms(res, req.body, connection);
        });
        exp.post("/selectRoomById", (req, res) => {
          database.selectRoomById(res, req.body, connection);
        });
        exp.post("/selectRoomByTitle", (req, res) => {
          database.selectRoomByTitle(res, req.body, connection);
        });
        exp.post("/selectRoomInformation", (req, res) => {
          database.selectRoomHashedValue(res, req.body, connection);
        });
        exp.post("/selectVideosByRoomId", (req, res) => {
          database.selectVideosByRoomId(res, req.body, connection);
        });
        exp.post("/selectVideoByYoutubeId", (req, res) => {
          database.selectVideoByYoutubeId(res, req.body, connection);
        });
        exp.post("/updateUserPassword", (req, res) => {
          database.updateUserPassword(res, req.body, connection);
        });
        exp.post("/updateUserRoomId", (req, res) => {
          database.updateUserRoomId(res, req.body, connection);
        });
        exp.post("/updateDeleteEvent", (req, res) => {
          database.updateDeleteEvent(res, req.body, connection);
        });
        exp.post("/updateUpVotes", (req, res) => {
          database.updateUpVotes(res, req.body, connection);
        });
        exp.post("/updatePlaylistStarted", (req, res) => {
          database.updatePlaylistStarted(res, req.body, connection);
        });
        exp.post("/updatePlaylistStatus", (req, res) => {
          database.updatePlaylistStatus(res, req.body, connection);
        });
        exp.post("/uploadImage", upload.single('Image'), (req, res) => {
          const fileData = req.file;
          res.send(fileData.filename)
        });
      }
    });

    exp.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
