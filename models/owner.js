module.exports = function(sequelize, DataTypes) {

var Owner = sequelize.define("Owner", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_name: {
    	type: DataTypes.STRING,
    	allowNull: false
    }
  });

  return Owner;
};