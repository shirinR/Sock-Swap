var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {

var Users = sequelize.define("Users", {
  firstName: {
  type: Sequelize.STRING(50),
  allowNull: false,
  validate: {
      len: {
        args: [0, 50],
        msg: 'Firstname has too many characters'
      }
    }
  },
  lastName: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      len: {
        args: [0, 100],
        msg: 'Lastname have too many characters'
      }
    }
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'It is not an email address.'
      },
      isUnique: connection.validateIsUnique(
        'email',
        'This email address already exists.'
      )
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
    }
  });


  function cryptPassword(password) {
    console.log("cryptPassword" + password);
    return new Promise(function(resolve, reject) {
      bcrypt.genSalt(10, function(err, salt) {
        // Encrypt password using bycrpt module
        if (err) return reject(err);

        bcrypt.hash(password, salt, null, function(err, hash) {
          if (err) return reject(err);
          return resolve(hash);
        });
      });
    });
  }

  Users.beforeCreate(function(user, options) {
    return cryptPassword(Users.password).then(function success (){
        Users.password = success;
    }).catch(function err (){
        if (err) console.log(err);
    });
  });

  // Users.associate = function(models) {
  //   Users.belongsTo(models.Owner, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return Users;
};
