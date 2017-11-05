$('#btn-login').on('click', function(){
  var username_val = $('#username').val().trim();
  var password_val = $('#password').val().trim();

  $.get('/api/all-socks', function(){
    console.log('')
  });
});
