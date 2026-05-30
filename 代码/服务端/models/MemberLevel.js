module.exports = (sequelize, DataTypes) => {
  return sequelize.define('MemberLevel', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: { type: DataTypes.TEXT, allowNull: false },
    min_amount: { type: DataTypes.REAL, allowNull: false },
    discount: { type: DataTypes.REAL, defaultValue: 1.0 },
    point_rate: { type: DataTypes.INTEGER, defaultValue: 1 }
  }, {
    tableName: 'member_levels'
  });
};
