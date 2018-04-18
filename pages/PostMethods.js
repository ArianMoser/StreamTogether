import $ from "jquery";
const bcrypt = require("bcryptjs");

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
export const roomFunctionByTitle = (api, title) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({ title: title}),
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
export const registerFunction = (api, username, email, password) => {
  const hash = bcrypt.hashSync(password, 11);
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({
        username: username,
        email: email,
        password: hash
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

export const createRoomFunction = (api, title, description, password) => {
  // var hash = (password!=undefined || password!="")? bcrypt.hashSync(password, 11): "";
  if (password === undefined || password == ""){
    var hash = "";
  } else {
    var hash = bcrypt.hashSync(password, 11);
  }
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({
        title: title,
        description: description,
        password: hash
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
