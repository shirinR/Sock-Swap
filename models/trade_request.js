module.exports = function(sequelize, DataTypes) {

var TradeRequest = sequelize.define("TradeRequest", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    OwnerId: {
      type: DataTypes.INTEGER
    },
    ownerSockId: {
      type: DataTypes.INTEGER
    },
    requesteeSockId: {
      type: DataTypes.INTEGER
    }
  });

  TradeRequest.associate = function(models) {
    TradeRequest.belongsTo(models.Owner, {

      foreignKey: {
        name: 'requesteeId',
        allowNull: false
      }
    });

  };
  return TradeRequest;
};
// INSERT INTO TradeRequest (ownerId, requesteeId, sockId)
// VALUES (1,2,1);
// INSERT INTO TradeRequests (ownerId, requesteeId, ownerSockId,requesteeSockId,createdAt, updatedAt)
// VALUES (1,2,2,1CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
