$(function() {

  $('#btn_login').on('click', function(event){
    var userInfo = {
      username: $('#username').val().trim(),
      password: $('#password').val().trim()
    };
    // if(username === Owner.user_name && password === Owner.password){}
    $.ajax({
      method: "GET",
      url: "/api/owners/"
    }).done(function(userInfo){
      console.log('>>>>', userInfo);
    });
  });
});
