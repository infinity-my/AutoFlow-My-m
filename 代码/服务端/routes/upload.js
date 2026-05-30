const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const config = require('../config');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const subDir = req.query.type || 'products';
    const dir = path.join(config.upload.dir, subDir);
    const fs = require('fs');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '_' + Math.random().toString(36).slice(2, 8) + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: config.upload.maxSize },
  fileFilter: (req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) cb(null, true);
    else cb(new Error('不支持的文件格式'));
  }
});

router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) return res.json({ code: 400, message: '请选择文件', data: null });
  const subDir = req.query.type || 'products';
  const url = `/uploads/${subDir}/${req.file.filename}`;
  res.json({ code: 200, message: 'success', data: { url, filename: req.file.filename } });
});

module.exports = router;
