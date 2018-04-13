const express = require("express");
const http = require("http");
const exp = express();
const bodyParser = require("body-parser");
const next = require("next");
const database = require("./database");
const mysql = require("mysql");

const server = http.createServer(exp);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

//Datenbankverbindung aufbauen
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "streamtogether"
});

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

    connection.connect(function(err) {
      // in case of error
      if (err) {
        console.log("Database Connection ERROR");
        console.log(err.code);
        console.log(err.fatal);
      } else {
        console.log("Database CONNECTED");
        exp.post("/login", (req, res) => {
          database.selectUserByUserId(res, req.body, connection);
        });
        exp.post("/register", (req, res) => {
            database.insertUser(res, req.body, connection);
          });
      }
    });

    //Datenbank etc.

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
