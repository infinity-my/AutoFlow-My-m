module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Store', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, allowNull: false },
    address: { type: DataTypes.TEXT },
    phone: { type: DataTypes.TEXT },
    business_hours: { type: DataTypes.TEXT },
    images: { type: DataTypes.TEXT },
    status: { type: DataTypes.INTEGER, defaultValue: 1 }
  }, {
    tableName: 'stores'
  });
};
