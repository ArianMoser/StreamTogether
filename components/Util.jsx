import React, {Component} from "react";
import { read_cookie, delete_cookie } from "sfcookies";

const jwt = require("jsonwebtoken");
// readsout the Cookie
// () -> username (type: String)
export function checksession() {
  if (read_cookie("StreamTogether").length != 0) {
    try {
      var decodedsession = jwt.verify(
        read_cookie("StreamTogether"),
        "shhhhh"
      );
      return decodedsession.username;
    } catch (err) {
      console.log("Error-Message: " + err.message);
      return "ErrorTokenFalse";
    }
  } else {
    return "ErrorTokenFalse";
  }
}
