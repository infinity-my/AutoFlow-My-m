const path = require('path');

module.exports = {
  port: process.env.PORT || 3000,
  jwt: {
    secret: process.env.JWT_SECRET || 'coffee-shop-student-project-2025',
    expiresIn: '7d'
  },
  database: {
    storage: path.join(__dirname, '..', 'database.db'),
    dialect: 'sqlite',
    logging: false
  },
  upload: {
    dir: path.join(__dirname, '..', 'uploads'),
    maxSize: 5 * 1024 * 1024
  },
  wx: {
    appid: process.env.WX_APPID || '',
    secret: process.env.WX_SECRET || ''
  }
};
