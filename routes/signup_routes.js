var express = require("express");
var router = express.Router();
var db = require('../models');


const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/socks_db'
const db = pgp(connectionString);

router.get('/', (request,response) =>{
  response.render('/');
  console.log('here');
});
// $('#btn-signup').on('click', function(){
//   var username_val = $('#username').val().trim();
//   var password_val = $('#password').val().trim();

  router.post('/', (request, response) => {
    const { username, password } = request.body
    console.log(request.body);
    db.createUser( username, password )
    response.redirect('/')
  });
// });

module.exports = router;
