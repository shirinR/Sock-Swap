$(function() {

  var userInfo = [];
  $('#btn_login').on('click', function(event){
    var userInput = {
      username: $('#username').val().trim(),
      password: $('#password').val().trim()
    };
    $.ajax({
      method: "GET",
      url: "/api/owners"
    }).done(function(userInfo){
      // console.log('>>>>>>>', userInfo);
      // console.log('########',userInput);

      for(var i=0; i<userInfo.length; i++){
        if(userInfo[i].user_name === userInput.username){
          if (userInfo[i].password === userInput.password){
            console.log('>>>>>>>here');
            // TODO: route to next page
          }else{
            console.log('Password is not Match so you cannot login');
          }
        }
      }
    });
  });
});
