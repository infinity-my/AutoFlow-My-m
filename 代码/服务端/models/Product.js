module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    category_id: { type: DataTypes.INTEGER },
    name: { type: DataTypes.TEXT, allowNull: false },
    description: { type: DataTypes.TEXT },
    main_image: { type: DataTypes.TEXT, allowNull: false },
    images: { type: DataTypes.TEXT },
    price: { type: DataTypes.REAL, allowNull: false },
    original_price: { type: DataTypes.REAL },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    sales: { type: DataTypes.INTEGER, defaultValue: 0 },
    is_on_sale: { type: DataTypes.INTEGER, defaultValue: 1 },
    specs: { type: DataTypes.TEXT }
  }, {
    tableName: 'products'
  });
};
