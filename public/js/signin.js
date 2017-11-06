$(function() {

  $('#btn_login').on('click', function(event){
    var userInfo = {
      user_name: $('#username').val().trim(),
      password: $('#password').val().trim()
    };
    console.log('here');

    if(user_name === owner.user_name && password === owner.password){
      // $.get('/main', userInfo).done(...);
    }
  });
});
