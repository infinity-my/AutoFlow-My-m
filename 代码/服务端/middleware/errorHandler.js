module.exports = (err, req, res, next) => {
  console.error('[Error]', err.message || err);
  res.status(err.status || 500).json({
    code: err.code || 500,
    message: err.message || '服务器内部错误',
    data: null
  });
};
