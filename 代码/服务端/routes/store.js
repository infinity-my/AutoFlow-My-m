const router = require('express').Router();
const db = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const stores = await db.Store.findAll({ where: { status: 1 } });
    res.json({ code: 200, message: 'success', data: stores });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const store = await db.Store.findByPk(req.params.id);
    if (!store) return res.status(404).json({ code: 404, message: '门店不存在', data: null });
    res.json({ code: 200, message: 'success', data: store });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
