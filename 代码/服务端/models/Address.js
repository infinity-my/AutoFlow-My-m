module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Address', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.TEXT, allowNull: false, comment: '收货人姓名' },
    phone: { type: DataTypes.TEXT, allowNull: false, comment: '联系电话' },
    province: { type: DataTypes.TEXT, allowNull: false, comment: '省份' },
    city: { type: DataTypes.TEXT, allowNull: false, comment: '城市' },
    district: { type: DataTypes.TEXT, allowNull: false, comment: '区/县' },
    detail: { type: DataTypes.TEXT, allowNull: false, comment: '详细地址' },
    tag: { type: DataTypes.TEXT, defaultValue: '家', comment: '标签' },
    isDefault: { type: DataTypes.BOOLEAN, defaultValue: false, comment: '是否默认地址' }
  }, {
    tableName: 'addresses',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
};
