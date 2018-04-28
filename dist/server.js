"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var express = require("express");
var http = require("http");
var exp = express();
var bodyParser = require("body-parser");
var next = require("next");
var database = require("./database");
var mysql = require("mysql");

var server = http.createServer(exp);
var dev = process.env.NODE_ENV !== "production";
var app = next({ dev: dev });
var handle = app.getRequestHandler();

//Datenbankverbindung aufbauen
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "streamtogether"
});

exp.use(bodyParser.urlencoded({ extended: false }));
exp.use(bodyParser.json());
app.prepare().then(_asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
  return _regenerator2.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          exp.use(express.static("./static/"));

          exp.get("/index", function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
              return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      res.redirect("/");

                    case 1:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, undefined);
            }));

            return function (_x, _x2) {
              return _ref2.apply(this, arguments);
            };
          }());

          exp.get("/", function (req, res) {
            return app.render(req, res, "/index");
          });

          connection.connect(function (err) {
            // in case of error
            if (err) {
              console.log("Database Connection ERROR");
              console.log(err.code);
              console.log(err.fatal);
            } else {
              console.log("Database CONNECTED");

              exp.post("/createRoom", function (req, res) {
                database.insertRoom(res, req.body, connection);
              });
              exp.post("/createEventDropRoom", function (req, res) {
                database.createEventDropRoom(res, req.body, connection);
              });
              exp.post("/createVideo", function (req, res) {
                database.insertVideo(res, req.body, connection);
              });
              exp.post("/createPlaylist", function (req, res) {
                database.insertPlaylist(res, req.body, connection);
              });
              exp.post("/deletePlaylist", function (req, res) {
                database.deletePlaylist(res, req.body, connection);
              });
              exp.post("/deleteUser", function (req, res) {
                database.deleteUserByID(res, req.body, connection);
              });
              exp.post("/getuserbyemail", function (req, res) {
                database.selectUserByEmail(res, req.body, connection);
              });
              exp.post("/getUserById", function (req, res) {
                database.selectUserById(res, req.body, connection);
              });
              exp.post("/getuserandroombyusername", function (req, res) {
                database.selectUserAndRoomByUsername(res, req.body, connection);
              });
              exp.post("/getuserbyusername", function (req, res) {
                database.selectUserByUsername(res, req.body, connection);
              });
              exp.post("/login", function (req, res) {
                database.selectUserByUsernameOrEmail(res, req.body, connection);
              });
              exp.post("/register", function (req, res) {
                database.insertUser(res, req.body, connection);
              });
              exp.post("/selectRooms", function (req, res) {
                database.selectRooms(res, req.body, connection);
              });
              exp.post("/selectRoomByTitle", function (req, res) {
                database.selectRoomByTitle(res, req.body, connection);
              });
              exp.post("/selectRoomInformation", function (req, res) {
                database.selectRoomHashedValue(res, req.body, connection);
              });
              exp.post("/selectVideosByRoomId", function (req, res) {
                database.selectVideosByRoomId(res, req.body, connection);
              });
              exp.post("/selectVideoByYoutubeId", function (req, res) {
                database.selectVideoByYoutubeId(res, req.body, connection);
              });
              exp.post("/updateUserPassword", function (req, res) {
                database.updateUserPassword(res, req.body, connection);
              });
              exp.post("/updateUserRoomId", function (req, res) {
                database.updateUserRoomId(res, req.body, connection);
              });
              exp.post("/updateDeleteEvent", function (req, res) {
                database.updateDeleteEvent(res, req.body, connection);
              });
              exp.post("/updateUpVotes", function (req, res) {
                database.updateUpVotes(res, req.body, connection);
              });
            }
          });

          //Datenbank etc.

          exp.get("*", function (req, res) {
            return handle(req, res);
          });

          server.listen(3000, function (err) {
            if (err) throw err;
            console.log("> Ready on http://localhost:3000");
          });

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, undefined);
}))).catch(function (ex) {
  console.error(ex.stack);
  process.exit(1);
});
//# sourceMappingURL=server.js.map