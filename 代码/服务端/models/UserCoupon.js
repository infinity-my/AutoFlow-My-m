module.exports = (sequelize, DataTypes) => {
  return sequelize.define('UserCoupon', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    coupon_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.INTEGER, defaultValue: 0 },
    expire_at: { type: DataTypes.TEXT }
  }, {
    tableName: 'user_coupons'
  });
};
