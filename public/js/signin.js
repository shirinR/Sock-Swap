  
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

            var storedOwnerId = {
              ownerid:userInfo[i].id,
            };

            localStorage.setItem('storedOwnerId', JSON.stringify(storedOwnerId));

            return getMainPage();

          }else{
            //visual indication your PASSWORD IS WRONG
            $('.form-group').animate({ opacity:'0.5' },100);
            $('.form-group').animate({ opacity:'1' },100);            
            $('.form-group').animate({ opacity:'0.5' },100);
            $('.form-group').animate({ opacity:'1' },100);
            $('#password').val('');
            $('#password').attr('placeholder','Password is inccorect. Please try again.');
            console.log('Password is not Match so you cannot login');
          }
        }
      }
    });
  });
});