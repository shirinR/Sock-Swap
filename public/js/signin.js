$(function() {

  $('#btn_login').on('click', function(event){
    var userInfo = {
      username: $('#username').val().trim(),
      password: $('#password').val().trim()
    };
    console.log('here');

    if(username === Owner.user_name && password === Owner.password){
      // $.get('/main', userInfo).done(...);
    }
  });
});
