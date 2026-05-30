const { verify } = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ code: 401, message: '未授权，请先登录', data: null });
  }
  try {
    const token = auth.slice(7);
    const decoded = verify(token, config.jwt.secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ code: 401, message: 'token无效或已过期', data: null });
  }
};
