import $ from 'jquery';


//----------------------LOGIN----------------------//
export const meineFKT=(api, username, password) =>
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

    })
}