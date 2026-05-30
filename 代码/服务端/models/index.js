const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize({
  dialect: config.database.dialect,
  storage: config.database.storage,
  logging: config.database.logging,
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./User')(sequelize, DataTypes);
db.MemberLevel = require('./MemberLevel')(sequelize, DataTypes);
db.Category = require('./Category')(sequelize, DataTypes);
db.Product = require('./Product')(sequelize, DataTypes);
db.Cart = require('./Cart')(sequelize, DataTypes);
db.Order = require('./Order')(sequelize, DataTypes);
db.OrderItem = require('./OrderItem')(sequelize, DataTypes);
db.Store = require('./Store')(sequelize, DataTypes);
db.Banner = require('./Banner')(sequelize, DataTypes);
db.Coupon = require('./Coupon')(sequelize, DataTypes);
db.UserCoupon = require('./UserCoupon')(sequelize, DataTypes);
db.Queue = require('./Queue')(sequelize, DataTypes);
db.Address = require('./Address')(sequelize, DataTypes);

db.MemberLevel.hasMany(db.User, { foreignKey: 'member_level', sourceKey: 'id', as: 'users' });
db.User.belongsTo(db.MemberLevel, { foreignKey: 'member_level', targetKey: 'id', as: 'levelInfo' });

db.Category.hasMany(db.Product, { foreignKey: 'category_id', as: 'products' });
db.Product.belongsTo(db.Category, { foreignKey: 'category_id', as: 'category' });

db.User.hasMany(db.Cart, { foreignKey: 'user_id', as: 'cartItems' });
db.Cart.belongsTo(db.User, { foreignKey: 'user_id', as: 'user' });
db.Product.hasMany(db.Cart, { foreignKey: 'product_id', as: 'cartItems' });
db.Cart.belongsTo(db.Product, { foreignKey: 'product_id', as: 'product' });

db.User.hasMany(db.Order, { foreignKey: 'user_id', as: 'orders' });
db.Order.belongsTo(db.User, { foreignKey: 'user_id', as: 'user' });
db.Store.hasMany(db.Order, { foreignKey: 'store_id', as: 'orders' });
db.Order.belongsTo(db.Store, { foreignKey: 'store_id', as: 'store' });

db.Order.hasMany(db.OrderItem, { foreignKey: 'order_id', as: 'items' });
db.OrderItem.belongsTo(db.Order, { foreignKey: 'order_id', as: 'order' });
db.Product.hasMany(db.OrderItem, { foreignKey: 'product_id', as: 'orderItems' });
db.OrderItem.belongsTo(db.Product, { foreignKey: 'product_id', as: 'product' });

db.User.hasMany(db.UserCoupon, { foreignKey: 'user_id', as: 'coupons' });
db.UserCoupon.belongsTo(db.User, { foreignKey: 'user_id', as: 'user' });
db.Coupon.hasMany(db.UserCoupon, { foreignKey: 'coupon_id', as: 'userCoupons' });
db.UserCoupon.belongsTo(db.Coupon, { foreignKey: 'coupon_id', as: 'couponInfo' });

db.User.hasMany(db.Queue, { foreignKey: 'user_id', as: 'queues' });
db.Queue.belongsTo(db.User, { foreignKey: 'user_id', as: 'user' });
db.Store.hasMany(db.Queue, { foreignKey: 'store_id', as: 'queues' });
db.Queue.belongsTo(db.Store, { foreignKey: 'store_id', as: 'store' });

db.User.hasMany(db.Address, { foreignKey: 'user_id', as: 'addresses' });
db.Address.belongsTo(db.User, { foreignKey: 'user_id', as: 'user' });

module.exports = db;
