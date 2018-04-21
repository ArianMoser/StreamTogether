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

var server = http.createServer(exp);
var dev = process.env.NODE_ENV !== "production";
var app = next({ dev: dev });
var handle = app.getRequestHandler();

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

                    exp.get("*", function (req, res) {
                        return handle(req, res);
                    });

                    server.listen(3000, function (err) {
                        if (err) throw err;
                        console.log("> Ready on http://localhost:3000");
                    });

                case 5:
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