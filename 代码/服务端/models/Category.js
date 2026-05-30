module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, allowNull: false },
    parent_id: { type: DataTypes.INTEGER, defaultValue: 0 },
    sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
    icon_url: { type: DataTypes.TEXT },
    is_show: { type: DataTypes.INTEGER, defaultValue: 1 }
  }, {
    tableName: 'categories'
  });
};
