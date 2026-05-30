const router = require('express').Router();
const db = require('../models');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res, next) => {
  try {
    const items = await db.Cart.findAll({
      where: { user_id: req.user.id },
      include: [{ model: db.Product, as: 'product' }],
      order: [['created_at', 'DESC']]
    });
    res.json({ code: 200, message: 'success', data: items });
  } catch (err) {
    next(err);
  }
});

router.post('/', auth, async (req, res, next) => {
  try {
    const { product_id, specs, quantity = 1 } = req.body;
    const product = await db.Product.findByPk(product_id);
    if (!product) return res.status(404).json({ code: 404, message: '商品不存在', data: null });
    if (product.stock < quantity) return res.json({ code: 400, message: '库存不足', data: null });

    const existing = await db.Cart.findOne({
      where: { user_id: req.user.id, product_id, specs: specs || null }
    });
    if (existing) {
      await existing.update({ quantity: existing.quantity + quantity });
      res.json({ code: 200, message: 'success', data: existing });
    } else {
      const item = await db.Cart.create({ user_id: req.user.id, product_id, specs, quantity });
      res.json({ code: 200, message: 'success', data: item });
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:id', auth, async (req, res, next) => {
  try {
    const item = await db.Cart.findOne({ where: { id: req.params.id, user_id: req.user.id } });
    if (!item) return res.status(404).json({ code: 404, message: '购物车项不存在', data: null });
    const { quantity, specs } = req.body;
    await item.update({ quantity, specs });
    res.json({ code: 200, message: 'success', data: item });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const item = await db.Cart.findOne({ where: { id: req.params.id, user_id: req.user.id } });
    if (!item) return res.status(404).json({ code: 404, message: '购物车项不存在', data: null });
    await item.destroy();
    res.json({ code: 200, message: 'success', data: null });
  } catch (err) {
    next(err);
  }
});

router.delete('/clear/all', auth, async (req, res, next) => {
  try {
    await db.Cart.destroy({ where: { user_id: req.user.id } });
    res.json({ code: 200, message: 'success', data: null });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
