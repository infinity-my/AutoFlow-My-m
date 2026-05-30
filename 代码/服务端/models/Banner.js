module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Banner', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    image_url: { type: DataTypes.TEXT, allowNull: false },
    title: { type: DataTypes.TEXT },
    link_type: { type: DataTypes.INTEGER, defaultValue: 0 },
    link_value: { type: DataTypes.TEXT },
    sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
    is_show: { type: DataTypes.INTEGER, defaultValue: 1 }
  }, {
    tableName: 'banners'
  });
};
