const router = require('express').Router();
const db = require('../models');
const auth = require('../middleware/auth');

router.get('/profile', auth, async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.user.id)
    const couponCount = await db.UserCoupon.count({
      where: { user_id: req.user.id, status: 0 }
    })
    res.json({
      code: 200,
      message: 'success',
      data: {
        balance: user.balance || 0,
        couponCount: couponCount || 0,
        points: user.points || 0
      }
    })
  } catch (err) {
    next(err)
  }
})

router.get('/points', auth, async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.user.id, {
      include: [{ model: db.MemberLevel, as: 'levelInfo' }]
    });
    res.json({
      code: 200, message: 'success',
      data: {
        points: user.points,
        member_level: user.member_level,
        level_info: user.levelInfo,
        total_consumption: user.total_consumption
      }
    });
  } catch (err) {
    next(err);
  }
});

router.get('/coupons', auth, async (req, res, next) => {
  try {
    const { status } = req.query;
    const where = { user_id: req.user.id };
    if (status !== undefined) where.status = parseInt(status);

    const coupons = await db.UserCoupon.findAll({
      where,
      include: [{ model: db.Coupon, as: 'couponInfo' }],
      order: [['created_at', 'DESC']]
    });
    res.json({ code: 200, message: 'success', data: coupons });
  } catch (err) {
    next(err);
  }
});

router.post('/coupons/claim', auth, async (req, res, next) => {
  try {
    const { coupon_id } = req.body;
    const coupon = await db.Coupon.findByPk(coupon_id);
    if (!coupon) return res.json({ code: 404, message: '优惠券不存在', data: null });
    if (coupon.remain_count <= 0) return res.json({ code: 400, message: '优惠券已领完', data: null });

    const existing = await db.UserCoupon.findOne({ where: { user_id: req.user.id, coupon_id } });
    if (existing) return res.json({ code: 400, message: '已领取过该优惠券', data: null });

    const now = new Date();
    const expireAt = new Date(now.getTime() + coupon.valid_days * 24 * 60 * 60 * 1000);

    const userCoupon = await db.UserCoupon.create({
      user_id: req.user.id,
      coupon_id,
      status: 0,
      expire_at: expireAt.toISOString()
    });
    await coupon.decrement('remain_count');
    res.json({ code: 200, message: 'success', data: userCoupon });
  } catch (err) {
    next(err);
  }
});

router.get('/coupons/available', auth, async (req, res, next) => {
  try {
    const { amount } = req.query;
    const now = new Date().toISOString();
    const where = { user_id: req.user.id, status: 0, expire_at: { [db.Sequelize.Op.gt]: now } };
    const coupons = await db.UserCoupon.findAll({
      where,
      include: [{ model: db.Coupon, as: 'couponInfo' }]
    });
    let filtered = coupons;
    if (amount) {
      filtered = coupons.filter(c => c.couponInfo && c.couponInfo.min_amount <= parseFloat(amount));
    }
    res.json({ code: 200, message: 'success', data: filtered });
  } catch (err) {
    next(err);
  }
});

router.get('/addresses', auth, async (req, res, next) => {
  try {
    const addresses = await db.Address.findAll({
      where: { user_id: req.user.id },
      order: [['isDefault', 'DESC'], ['created_at', 'DESC']]
    });
    res.json({ code: 200, message: 'success', data: addresses });
  } catch (err) {
    next(err);
  }
});

router.post('/addresses', auth, async (req, res, next) => {
  try {
    const { name, phone, province, city, district, detail, tag, isDefault } = req.body;
    if (!name || !phone || !detail) {
      return res.json({ code: 400, message: '姓名、手机号和详细地址不能为空', data: null });
    }

    if (isDefault) {
      await db.Address.update({ isDefault: 0 }, { where: { user_id: req.user.id } });
    }

    const address = await db.Address.create({
      user_id: req.user.id,
      name,
      phone,
      province: province || '',
      city: city || '',
      district: district || '',
      detail,
      tag: tag || '家',
      isDefault: isDefault ? 1 : 0
    });
    res.json({ code: 200, message: 'success', data: address });
  } catch (err) {
    next(err);
  }
});

router.get('/addresses/:id', auth, async (req, res, next) => {
  try {
    const address = await db.Address.findOne({
      where: { id: req.params.id, user_id: req.user.id }
    });
    if (!address) return res.status(404).json({ code: 404, message: '地址不存在', data: null });
    res.json({ code: 200, message: 'success', data: address });
  } catch (err) {
    next(err);
  }
});

router.put('/addresses/:id', auth, async (req, res, next) => {
  try {
    const address = await db.Address.findOne({
      where: { id: req.params.id, user_id: req.user.id }
    });
    if (!address) return res.status(404).json({ code: 404, message: '地址不存在', data: null });

    const { name, phone, province, city, district, detail, tag, isDefault } = req.body;

    if (isDefault) {
      await db.Address.update({ isDefault: 0 }, { where: { user_id: req.user.id } });
    }

    await address.update({
      name: name || address.name,
      phone: phone || address.phone,
      province: province !== undefined ? province : address.province,
      city: city !== undefined ? city : address.city,
      district: district !== undefined ? district : address.district,
      detail: detail || address.detail,
      tag: tag !== undefined ? tag : address.tag,
      isDefault: isDefault !== undefined ? (isDefault ? 1 : 0) : address.isDefault
    });
    res.json({ code: 200, message: 'success', data: address });
  } catch (err) {
    next(err);
  }
});

router.delete('/addresses/:id', auth, async (req, res, next) => {
  try {
    const address = await db.Address.findOne({
      where: { id: req.params.id, user_id: req.user.id }
    });
    if (!address) return res.status(404).json({ code: 404, message: '地址不存在', data: null });
    await address.destroy();
    res.json({ code: 200, message: 'success', data: null });
  } catch (err) {
    next(err);
  }
});

router.put('/addresses/:id/default', auth, async (req, res, next) => {
  try {
    const address = await db.Address.findOne({
      where: { id: req.params.id, user_id: req.user.id }
    });
    if (!address) return res.status(404).json({ code: 404, message: '地址不存在', data: null });
    await db.Address.update({ isDefault: 0 }, { where: { user_id: req.user.id } });
    await address.update({ isDefault: 1 });
    res.json({ code: 200, message: 'success', data: null });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
