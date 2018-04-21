import React, { Fragment, Component } from "react";
import { bake_cookie, read_cookie, delete_cookie } from "sfcookies";

export default class cookies {
  //Checksession
  checksession() {
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
}
