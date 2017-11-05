module.exports = function(sequelize, DataTypes) {

var Users = sequelize.define("Users", {
  username: {
  type: DataTypes.STRING(50),
  allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
    }
  });

  return Users;
};
