const router = require('express').Router();
const db = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const banners = await db.Banner.findAll({
      where: { is_show: 1 },
      order: [['sort_order', 'ASC'], ['id', 'ASC']]
    });
    res.json({ code: 200, message: 'success', data: banners });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
