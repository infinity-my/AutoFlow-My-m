module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Store', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, allowNull: false },
    address: { type: DataTypes.TEXT },
    phone: { type: DataTypes.TEXT },
    business_hours: { type: DataTypes.TEXT },
    images: { type: DataTypes.TEXT },
    status: { type: DataTypes.INTEGER, defaultValue: 1 },
    latitude: { type: DataTypes.FLOAT, allowNull: true },
    longitude: { type: DataTypes.FLOAT, allowNull: true },
    rating: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 4.8 },
    reviews: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 }
  }, {
    tableName: 'stores'
  });
};
