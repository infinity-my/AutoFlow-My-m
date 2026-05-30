const express = require('express');
const path = require('path');
const cors = require('cors');
const config = require('./config');
const errorHandler = require('./middleware/errorHandler');
const db = require('./models');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1', require('./routes/product'));
app.use('/api/v1/cart', require('./routes/cart'));
app.use('/api/v1/orders', require('./routes/order'));
app.use('/api/v1/stores', require('./routes/store'));
app.use('/api/v1/queue', require('./routes/queue'));
app.use('/api/v1/member', require('./routes/member'));
app.use('/api/v1/banners', require('./routes/banner'));
app.use('/api/v1/upload', require('./routes/upload'));

app.use(errorHandler);

db.sequelize.sync().then(() => {
  app.listen(config.port, () => {
    console.log(`☕ 咖啡店服务端已启动: http://localhost:${config.port}`);
    console.log(`📁 上传文件目录: ${config.upload.dir}`);
    console.log(`🗄️  数据库文件: ${config.database.storage}`);
  });
}).catch(err => {
  console.error('数据库同步失败:', err);
  process.exit(1);
});
