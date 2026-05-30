module.exports = (sequelize, DataTypes) => {
  return sequelize.define('OrderItem', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order_id: { type: DataTypes.INTEGER },
    product_id: { type: DataTypes.INTEGER },
    product_name: { type: DataTypes.TEXT, allowNull: false },
    product_image: { type: DataTypes.TEXT },
    specs: { type: DataTypes.TEXT },
    price: { type: DataTypes.REAL, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    subtotal: { type: DataTypes.REAL, allowNull: false }
  }, {
    tableName: 'order_items'
  });
};
