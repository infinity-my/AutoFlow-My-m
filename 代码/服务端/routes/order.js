const router = require('express').Router();
const db = require('../models');
const auth = require('../middleware/auth');

function generateOrderNo() {
  const now = new Date();
  const ts = now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, '0') +
    String(now.getDate()).padStart(2, '0') +
    String(now.getHours()).padStart(2, '0') +
    String(now.getMinutes()).padStart(2, '0') +
    String(now.getSeconds()).padStart(2, '0');
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return ts + rand;
}

function generatePickupCode() {
  return Math.floor(Math.random() * 900 + 100).toString();
}

router.post('/preview', auth, async (req, res, next) => {
  try {
    const { items, coupon_id } = req.body;
    if (!items || !items.length) return res.json({ code: 400, message: '请选择商品', data: null });

    let totalAmount = 0;
    const previewItems = [];
    for (const item of items) {
      const product = await db.Product.findByPk(item.product_id);
      if (!product) return res.json({ code: 400, message: `商品ID${item.product_id}不存在`, data: null });
      const subtotal = product.price * item.quantity;
      totalAmount += subtotal;
      previewItems.push({
        product_id: product.id,
        product_name: product.name,
        product_image: product.main_image,
        price: product.price,
        quantity: item.quantity,
        subtotal,
        specs: item.specs || null
      });
    }

    let discountAmount = 0;
    if (coupon_id) {
      const userCoupon = await db.UserCoupon.findOne({
        where: { id: coupon_id, user_id: req.user.id, status: 0 },
        include: [{ model: db.Coupon, as: 'couponInfo' }]
      });
      if (userCoupon && userCoupon.couponInfo) {
        const c = userCoupon.couponInfo;
        if (totalAmount >= c.min_amount) {
          if (c.type === 1) discountAmount = c.value;
          else if (c.type === 2) discountAmount = totalAmount * (1 - c.value);
        }
      }
    }

    const payAmount = Math.max(0, totalAmount - discountAmount);
    res.json({
      code: 200, message: 'success',
      data: { items: previewItems, totalAmount, discountAmount, payAmount }
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', auth, async (req, res, next) => {
  try {
    const { items, order_type, store_id, remark, coupon_id } = req.body;
    if (!items || !items.length) return res.json({ code: 400, message: '请选择商品', data: null });
    if (!order_type) return res.json({ code: 400, message: '请选择用餐方式', data: null });

    let totalAmount = 0;
    const orderItems = [];
    for (const item of items) {
      const product = await db.Product.findByPk(item.product_id);
      if (!product) return res.json({ code: 400, message: `商品ID${item.product_id}不存在`, data: null });
      if (product.stock < item.quantity) return res.json({ code: 400, message: `${product.name}库存不足`, data: null });
      const subtotal = product.price * item.quantity;
      totalAmount += subtotal;
      orderItems.push({
        product_id: product.id,
        product_name: product.name,
        product_image: product.main_image,
        price: product.price,
        quantity: item.quantity,
        subtotal,
        specs: item.specs || null
      });
    }

    let discountAmount = 0;
    if (coupon_id) {
      const userCoupon = await db.UserCoupon.findOne({
        where: { id: coupon_id, user_id: req.user.id, status: 0 },
        include: [{ model: db.Coupon, as: 'couponInfo' }]
      });
      if (userCoupon && userCoupon.couponInfo) {
        const c = userCoupon.couponInfo;
        if (totalAmount >= c.min_amount) {
          if (c.type === 1) discountAmount = c.value;
          else if (c.type === 2) discountAmount = totalAmount * (1 - c.value);
          await userCoupon.update({ status: 1 });
        }
      }
    }

    const payAmount = Math.max(0, totalAmount - discountAmount);
    const order = await db.Order.create({
      order_no: generateOrderNo(),
      user_id: req.user.id,
      store_id: store_id || null,
      order_type,
      status: 0,
      total_amount: totalAmount,
      discount_amount: discountAmount,
      pay_amount: payAmount,
      remark: remark || null
    });

    for (const oi of orderItems) {
      await db.OrderItem.create({ ...oi, order_id: order.id });
      await db.Product.increment({ sales: oi.quantity }, { where: { id: oi.product_id } });
      await db.Product.decrement({ stock: oi.quantity }, { where: { id: oi.product_id } });
    }

    if (req.body.clear_cart) {
      await db.Cart.destroy({ where: { user_id: req.user.id } });
    }

    res.json({ code: 200, message: 'success', data: order });
  } catch (err) {
    next(err);
  }
});

router.get('/', auth, async (req, res, next) => {
  try {
    const { status, page = 1, pageSize = 10 } = req.query;
    const where = { user_id: req.user.id };
    if (status !== undefined && status !== '') where.status = parseInt(status);
    const { count, rows } = await db.Order.findAndCountAll({
      where,
      include: [{ model: db.OrderItem, as: 'items' }],
      order: [['created_at', 'DESC']],
      limit: parseInt(pageSize),
      offset: (parseInt(page) - 1) * parseInt(pageSize)
    });
    res.json({ code: 200, message: 'success', data: { list: rows, total: count, page: parseInt(page), pageSize: parseInt(pageSize) } });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', auth, async (req, res, next) => {
  try {
    const order = await db.Order.findOne({
      where: { id: req.params.id, user_id: req.user.id },
      include: [
        { model: db.OrderItem, as: 'items' },
        { model: db.Store, as: 'store', attributes: ['id', 'name', 'address'] }
      ]
    });
    if (!order) return res.status(404).json({ code: 404, message: '订单不存在', data: null });
    res.json({ code: 200, message: 'success', data: order });
  } catch (err) {
    next(err);
  }
});

router.post('/:id/cancel', auth, async (req, res, next) => {
  try {
    const order = await db.Order.findOne({ where: { id: req.params.id, user_id: req.user.id } });
    if (!order) return res.status(404).json({ code: 404, message: '订单不存在', data: null });
    if (order.status !== 0) return res.json({ code: 400, message: '只能取消待支付订单', data: null });
    await order.update({ status: 5 });
    const items = await db.OrderItem.findAll({ where: { order_id: order.id } });
    for (const item of items) {
      await db.Product.increment({ stock: item.quantity }, { where: { id: item.product_id } });
      await db.Product.decrement({ sales: item.quantity }, { where: { id: item.product_id } });
    }
    res.json({ code: 200, message: 'success', data: null });
  } catch (err) {
    next(err);
  }
});

router.post('/:id/pay', auth, async (req, res, next) => {
  try {
    const order = await db.Order.findOne({ where: { id: req.params.id, user_id: req.user.id } });
    if (!order) return res.status(404).json({ code: 404, message: '订单不存在', data: null });
    if (order.status !== 0) return res.json({ code: 400, message: '订单状态异常', data: null });

    const pickupCode = generatePickupCode();
    await order.update({
      status: 1,
      pay_type: req.body.pay_type || 1,
      paid_at: new Date().toISOString(),
      pickup_code: pickupCode
    });

    const user = await db.User.findByPk(req.user.id);
    if (user) {
      const pointsEarned = Math.floor(order.pay_amount);
      await user.update({
        total_consumption: user.total_consumption + order.pay_amount,
        points: user.points + pointsEarned
      });
      const levels = await db.MemberLevel.findAll({ order: [['min_amount', 'ASC']] });
      for (const level of levels) {
        if (user.total_consumption >= level.min_amount) {
          await user.update({ member_level: level.id });
        }
      }
    }

    res.json({ code: 200, message: 'success', data: { order_id: order.id, pickup_code: pickupCode } });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
