  
  $(function() {
  var userInfo = [];

  var ownerId;

  function getMainPage(){
    $.ajax({
      method: "GET",
      url: "/main"
    }).done(function(){
          window.location.href = "./main";
    });
  }

  $('#btn_login').on('click', function(event){
    var userInput = {
      username: $('#username').val().trim(),
      password: $('#password').val().trim()
    };
    $.ajax({
      method: "GET",
      url: "/api/owners"
    }).done(function(userInfo){

      for(var i=0; i<userInfo.length; i++){
        if(userInfo[i].user_name === userInput.username){
          if (userInfo[i].password === userInput.password){
            ownerId = userInfo[i].id;
            // console.log(ownerId);
            getMainPage();
            // console.log('>>>>', userInfo[i]);
            // console.log('@@@', ownerId);
          }else{
            console.log('Password is not Match so you cannot login');
          }
        }
      }
// console.log(ownerId);
      return ownerId;

    });
  });
});