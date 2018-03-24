const express = require("express");
const http = require("http");
const exp = express();
const bodyParser = require("body-parser");
const next = require("next");

const server = http.createServer(exp);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

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
            let query={
                xzy:"abc"
            }
            return app.render(req, res, "/index", query);
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
