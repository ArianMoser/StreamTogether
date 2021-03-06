//--------------------------------Imports-------------------------------//
import $ from "jquery";

//--------------------------------Declarations-------------------------------//
const bcrypt = require("bcryptjs");

//----------------------IMAGEUPLOAD----------------------//
export const uploadImage = (api, formdata) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: false,
      processData: false,
      data: formdata,
      success: function (res) {
        resolve(res);
      },
      error: function (xhr, status, err) {
        reject(err);
      }
    });
  });
};

//----------------------GETUSERDATA----------------------//
export const userFunctionByUsername = (api, username) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({ username: username }),
      success: function (res) {
        resolve(res);
      },
      error: function (xhr, status, err) {
        reject(err);
      }
    });
  });
};
//----------------------GETUSERDATA----------------------//
export const userFunctionByEmail = (api, email) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({ email: email }),
      success: function (res) {
        resolve(res);
      },
      error: function (xhr, status, err) {
        reject(err);
      }
    });
  });
};
//----------------------GETUSERDATA----------------------//
export const userFunctionById = (api, id) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({ id: id }),
      success: function (res) {
        resolve(res);
      },
      error: function (xhr, status, err) {
        reject(err);
      }
    });
  });
};
//----------------------GETROOMDATA----------------------//
export const roomFunctionShowAll = api => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({}),
      success: function (res) {
        resolve(res);
      },
      error: function (xhr, status, err) {
        reject(err);
      }
    });
  });
};
//----------------------GETROOMDATA----------------------//
export const roomFunctionById = (api, roomId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({ roomId: roomId }),
      success: function (res) {
        resolve(res);
      },
      error: function (xhr, status, err) {
        reject(err);
      }
    });
  });
};
//----------------------GETROOMDATA----------------------//
export const roomFunctionByTitle = (api, title) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({ title: title }),
      success: function (res) {
        resolve(res);
      },
      error: function (xhr, status, err) {
        reject(err);
      }
    });
  });
};
//----------------------GETROOMDATA----------------------//
export const roomFunctionByHashedValue = (api, hashedValue) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({ hashedValue: hashedValue }),
      success: function (res) {
        resolve(res);
      },
      error: function (xhr, status, err) {
        reject(err);
      }
    });
  });
};
//----------------------GETVIDEODATA----------------------//
export const videoFunctionByRoomId = (api, roomId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({ roomId: roomId }),
      success: function (res) {
        resolve(res);
      },
      error: function (xhr, status, err) {
        reject(err);
      }
    });
  });
};
//----------------------GETVIDEODATA----------------------//
export const videoFunctionByYoutubeId = (api, youtubeId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({ youtubeId: youtubeId }),
      success: function (res) {
        resolve(res);
      },
      error: function (xhr, status, err) {
        reject(err);
      }
    });
  });
};
//----------------------Login----------------------//
export const userFunctionLogin = (api, username, email) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({ username: username, email: email }),
      success: function (res) {
        resolve(res);
      },
      error: function (xhr, status, err) {
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
      success: function (res) {
        resolve(res);
      },
      error: function (xhr, status, err) {
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
  currentUser,
  responseUploadImage
) => {
  if (password === undefined || password == "") {
    var hash = "";
  } else {
    // hash password
    var hash = bcrypt.hashSync(password, 11);
  }
  // hash title
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
        hashedValue: hashedValue,
        responseUploadImage: responseUploadImage
      }),
      success: function (res) {
        resolve(res);
      },
      error: function (xhr, status, err) {
        reject(err);
      }
    });
  });
};

//--------------------Insert Video-----------------------//
export const insertVideo = (
  api,
  videoId,
  videoTitle,
  videoDescription,
  videoThumbnailUrl,
  channelId,
  channelName,
  userName
) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({
        videoId: videoId,
        videoTitle: videoTitle,
        videoDescription: videoDescription,
        videoThumbnailUrl: videoThumbnailUrl,
        channelId: channelId,
        channelName: channelName,
        userName: userName
      }),
      success: function (res) {
        resolve(res);
      },
      error: function (xhr, status, err) {
        reject(err);
      }
    });
  });
};

//---------------insert Playlist-----------------------------//
export const connectVideoAndRoom = (api, videoId, roomId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({
        videoId: videoId,
        roomId: roomId
      }),
      success: function (res) {
        resolve(res);
      },
      error: function (xhr, status, err) {
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
      success: function (res) {
        resolve(res);
      },
      error: function (xhr, status, err) {
        reject(err);
      }
    });
  });
};

//--------------------Update password---------------------//
export const changePassword = (api, id, passwordNew) => {
  // hash news password
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
      success: function (res) {
        resolve(res);
      },
      error: function (xhr, status, err) {
        reject(err);
      }
    });
  });
};
//----------------------thumbs-up/thumbs-down----------------------//
export const voteVideo = (api, roomId, videoId, voteValue) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({
        roomId: roomId,
        videoId: videoId,
        voteValue: voteValue
      }),
      success: function (res) {
        resolve(res);
      },
      error: function (xhr, status, err) {
        reject(err);
      }
    });
  });
};

//----------------Update started of a video (in playlist)-------------------//
export const updateStarted = (api, roomId, videoId, started, status) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({
        roomId: roomId,
        videoId: videoId,
        started: started,
        status: status
      }),
      success: function (res) {
        resolve(res);
      },
      error: function (xhr, status, err) {
        reject(err);
      }
    });
  });
};
export const updateStatus = (api, roomId, videoId, status) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({
        roomId: roomId,
        videoId: videoId,
        status: status
      }),
      success: function (res) {
        resolve(res);
      },
      error: function (xhr, status, err) {
        reject(err);
      }
    });
  });
};
//----------------------Delete user----------------------//
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
      success: function (res) {
        resolve(res);
      },
      error: function (xhr, status, err) {
        reject(err);
      }
    });
  });
};
//----------------------Delete playlist----------------------//
export const deletePlaylist = (api, roomId, videoId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({
        roomId: roomId,
        videoId: videoId
      }),
      success: function (res) {
        resolve(res);
      },
      error: function (xhr, status, err) {
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
      success: function (res) {
        resolve(res);
      },
      error: function (xhr, status, err) {
        reject(err);
      }
    });
  });
};
//-----------------Create Event for dropping temporary user--------//
export const dropUserEvent = (api, userid) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({
        userId: userid
      }),
      success: function (res) {
        resolve(res);
      },
      error: function (xhr, status, err) {
        reject(err);
      }
    });
  });
};

//--------------Alter Event for dropping rooms-------------//
//-----------------(resets the time)----------------------//
export const alterRoomEvent = (api, roomid) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: "application/json",
      data: JSON.stringify({
        roomid: roomid
      }),
      success: function (res) {
        resolve(res);
      },
      error: function (xhr, status, err) {
        reject(err);
      }
    });
  });
};
