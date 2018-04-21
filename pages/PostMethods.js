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
      data: JSON.stringify({ username: username }),
      success: function(res) {
        resolve(res);
      },
      error: function(xhr, status, err) {
        reject(err);
      }
    });
  });
};
export const roomFunctionShowAll = api => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({}),
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
      data: JSON.stringify({ title: title }),
      success: function(res) {
        resolve(res);
      },
      error: function(xhr, status, err) {
        reject(err);
      }
    });
  });
};
export const roomFunctionByHashedValue = (api, hashedValue) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({ hashedValue: hashedValue }),
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
      data: JSON.stringify({ email: email }),
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
      data: JSON.stringify({ username: username, email: username }),
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

//-----------------------CREATOR ROOM-------------------------//
export const createRoomFunction = (
  api,
  title,
  description,
  password,
  currentUser
) => {
  if (password === undefined || password == "") {
    var hash = "";
  } else {
    var hash = bcrypt.hashSync(password, 11);
  }
  var hashedValue = bcrypt.hashSync(title, 11);

  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({
        title: title,
        description: description,
        password: hash,
        creator: currentUser,
        hashedValue: hashedValue
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

//----------------------Update roomid----------------------//
export const changeRoomId = (api, username, roomId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({
        username: username,
        roomId: roomId
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

//--------------------Update password---------------------//
export const changePassword = (api, id, passwordNew) => {
  const hashNewPassword = bcrypt.hashSync(passwordNew, 11);
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({
        id: id,
        passwordNew: hashNewPassword
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

//----------------------Delete user----------------------//
//todo: add password check to delete an account
export const deleteUser = (api, id) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({
        id: id
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

//-----------------Create Event for dropping rooms--------//
export const dropRoomEvent = (api, roomid) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({
        roomid: roomid
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
