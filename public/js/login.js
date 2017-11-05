// var db = require('../../models');
//
// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/socks_db'
// const db = pgp(connectionString);
//
// function(){
//   $('#btn-signup').on('click', function(){
//     var username_val = $('#username').val().trim();
//     var password_val = $('#password').val().trim();
//     console.log('here');
//
//     app.get('/', function(){
//
//       console.log('>>>', username_val);
//       var createUser = function(username,password){
//         return db.none(`INSERT INTO users(username,password) VALUES($1,$2)`,[username,password]);
//       };
//     });
//   });
// };
