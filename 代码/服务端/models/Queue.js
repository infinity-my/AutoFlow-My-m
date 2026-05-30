module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Queue', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    store_id: { type: DataTypes.INTEGER, allowNull: false },
    queue_no: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, {
    tableName: 'queues'
  });
};
