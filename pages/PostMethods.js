import $ from 'jquery';


//----------------------LOGIN----------------------//
export const loginFunction=(api, username, password) =>
{
    return new Promise((resolve, reject) => {

      $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: 'application/json',
      data: JSON.stringify({username: username, password: password}),
      success: function(res) {
          resolve(res);  
      },
      error: function(xhr, status, err){
        reject(err);
      }
    });

    });
}


//----------------------REGISTER----------------------//
export const registerFunction=(api, username, email, password) =>
{
    return new Promise((resolve, reject) => {

      $.ajax({
      url: api,
      type: "POST",
      cache: false,
      contentType: 'application/json',
      data: JSON.stringify({username: username, email: email, password: password}),
      success: function(res) {
          resolve(res);  
      },
      error: function(xhr, status, err){
        reject(err);
      }
    });

    });
}