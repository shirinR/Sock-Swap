module.exports = function(sequelize, DataTypes) {

var Sock = sequelize.define("Sock", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    item_condition: {
      type: DataTypes.STRING,
      allowNull: false
    },
    item_value: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    trade_request: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    image_path: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },



  });

  Sock.associate = function(models) {
    Sock.belongsTo(models.Owner, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Sock;
};
