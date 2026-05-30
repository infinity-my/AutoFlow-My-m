module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    openid: { type: DataTypes.TEXT, unique: true },
    nickname: { type: DataTypes.TEXT, defaultValue: '咖啡爱好者' },
    avatar_url: { type: DataTypes.TEXT },
    phone: { type: DataTypes.TEXT, unique: true },
    password: { type: DataTypes.TEXT },
    gender: { type: DataTypes.ENUM('male', 'female'), allowNull: true },
    birthday: { type: DataTypes.DATEONLY, allowNull: true },
    email: { type: DataTypes.TEXT, allowNull: true },
    member_level: { type: DataTypes.INTEGER, defaultValue: 0 },
    points: { type: DataTypes.INTEGER, defaultValue: 0 },
    balance: { type: DataTypes.REAL, defaultValue: 0 },
    total_consumption: { type: DataTypes.REAL, defaultValue: 0 }
  }, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
};