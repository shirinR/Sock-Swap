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
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Sock.belongsTo(models.Owner, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Sock;
};
