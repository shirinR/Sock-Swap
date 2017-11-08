module.exports = function(sequelize, DataTypes) {

var TradeRequest = sequelize.define("TradeRequest", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ownerId: {
      type: DataTypes.INTEGER
    },
    requesteeId: {
      type: DataTypes.INTEGER
    },
    ownerSockId: {
      type: DataTypes.INTEGER
    },
    requesteeSockId: {
      type: DataTypes.INTEGER
    }
  });
  return TradeRequest;
};
// INSERT INTO TradeRequest (ownerId, requesteeId, sockId)
// VALUES (1,2,1);
// INSERT INTO TradeRequests (ownerId, requesteeId, ownerSockId,requesteeSockId,createdAt, updatedAt)
// VALUES (1,2,2,1CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
