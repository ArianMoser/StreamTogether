import $ from "jquery";
//const bcrypt = require("bcryptjs");

//----------------------GETUSERDATA----------------------//
export const userFunctionByUsername = (api, username) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({ username: username}),
      success: function(res) {
        resolve(res);
      },
      error: function(xhr, status, err) {
        reject(err);
      }
    });
  });
};

export const userFunctionByEmail = (api, email) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({ email: email}),
      success: function(res) {
        resolve(res);
      },
      error: function(xhr, status, err) {
        reject(err);
      }
    });
  });
};

//----------------------Login----------------------//
export const userFunctionLogin = (api, username) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({ username: username, email: username}),
      success: function(res) {
        resolve(res);
      },
      error: function(xhr, status, err) {
        reject(err);
      }
    });
  });
};


//----------------------REGISTER----------------------//
export const registerFunction = (api, username, email, password) => {     //HASH FUNKTION ENBINGEN
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({
        username: username,
        email: email,
        password: password
      }),
      success: function(res) {
        resolve(res);
      },
      error: function(xhr, status, err) {
        reject(err);
      }
    });
  });
};
