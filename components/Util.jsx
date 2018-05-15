//--------------------------------Imports-------------------------------//
import React, {Component} from "react";
import { read_cookie, delete_cookie } from "sfcookies";
import {getSessionKey} from "../components/Keys";

//--------------------------------Declarations-------------------------------//
const jwt = require("jsonwebtoken");

//****************************************************************************
//This component is used for checking the cookies
//****************************************************************************

// check if cookie is set, read cookie, return username
export function checksession() {
  if (read_cookie("StreamTogether").length != 0) {
    try {
      var decodedsession = jwt.verify(
        read_cookie("StreamTogether"),
        getSessionKey()
      );
      return decodedsession.username;
    } catch (err) {
      //console.log("Error-Message: " + err.message);
      return "ErrorTokenFalse";
    }
  } else {
    return "ErrorTokenFalse";
  }
}

// check if cookie is set, read cookie, return tempuser
export function checksessionfortempuser() {
  if (read_cookie("StreamTogether").length != 0) {
    try {
      var decodedsession = jwt.verify(
        read_cookie("StreamTogether"),
        getSessionKey()
      );
      return decodedsession.tempuser;
    } catch (err) {
      //console.log("Error-Message: " + err.message);
      return "ErrorTokenFalse";
    }
  } else {
    return "ErrorTokenFalse";
  }
}
