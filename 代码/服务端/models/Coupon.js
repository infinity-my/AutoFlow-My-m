module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Coupon', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, allowNull: false },
    type: { type: DataTypes.INTEGER, allowNull: false },
    value: { type: DataTypes.REAL, allowNull: false },
    min_amount: { type: DataTypes.REAL, defaultValue: 0 },
    valid_days: { type: DataTypes.INTEGER, defaultValue: 30 },
    total_count: { type: DataTypes.INTEGER, defaultValue: 100 },
    remain_count: { type: DataTypes.INTEGER, defaultValue: 100 }
  }, {
    tableName: 'coupons'
  });
};
