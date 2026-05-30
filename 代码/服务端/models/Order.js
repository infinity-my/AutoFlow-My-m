module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order_no: { type: DataTypes.TEXT, unique: true },
    user_id: { type: DataTypes.INTEGER },
    store_id: { type: DataTypes.INTEGER },
    order_type: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.INTEGER, defaultValue: 0 },
    total_amount: { type: DataTypes.REAL, allowNull: false },
    discount_amount: { type: DataTypes.REAL, defaultValue: 0 },
    pay_amount: { type: DataTypes.REAL, allowNull: false },
    pay_type: { type: DataTypes.INTEGER },
    pickup_code: { type: DataTypes.TEXT },
    remark: { type: DataTypes.TEXT },
    paid_at: { type: DataTypes.TEXT }
  }, {
    tableName: 'orders'
  });
};
