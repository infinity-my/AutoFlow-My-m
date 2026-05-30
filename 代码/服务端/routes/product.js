const router = require('express').Router();
const db = require('../models');

router.get('/categories', async (req, res, next) => {
  try {
    const categories = await db.Category.findAll({
      where: { is_show: 1 },
      order: [['sort_order', 'ASC'], ['id', 'ASC']]
    });
    res.json({ code: 200, message: 'success', data: categories });
  } catch (err) {
    next(err);
  }
});

router.get('/products', async (req, res, next) => {
  try {
    const { category_id, page = 1, pageSize = 20 } = req.query;
    const where = { is_on_sale: 1 };
    if (category_id) where.category_id = category_id;
    const { count, rows } = await db.Product.findAndCountAll({
      where,
      include: [{ model: db.Category, as: 'category', attributes: ['id', 'name'] }],
      order: [['sales', 'DESC']],
      limit: parseInt(pageSize),
      offset: (parseInt(page) - 1) * parseInt(pageSize)
    });
    res.json({ code: 200, message: 'success', data: { list: rows, total: count, page: parseInt(page), pageSize: parseInt(pageSize) } });
  } catch (err) {
    next(err);
  }
});

router.get('/products/search', async (req, res, next) => {
  try {
    const { keyword, page = 1, pageSize = 20 } = req.query;
    if (!keyword) return res.json({ code: 400, message: '请输入搜索关键词', data: null });
    const { count, rows } = await db.Product.findAndCountAll({
      where: {
        is_on_sale: 1,
        name: { [db.Sequelize.Op.like]: '%' + keyword + '%' }
      },
      order: [['sales', 'DESC']],
      limit: parseInt(pageSize),
      offset: (parseInt(page) - 1) * parseInt(pageSize)
    });
    res.json({ code: 200, message: 'success', data: { list: rows, total: count, page: parseInt(page), pageSize: parseInt(pageSize) } });
  } catch (err) {
    next(err);
  }
});

router.get('/products/:id', async (req, res, next) => {
  try {
    const product = await db.Product.findByPk(req.params.id, {
      include: [{ model: db.Category, as: 'category', attributes: ['id', 'name'] }]
    });
    if (!product) return res.status(404).json({ code: 404, message: '商品不存在', data: null });
    res.json({ code: 200, message: 'success', data: product });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
