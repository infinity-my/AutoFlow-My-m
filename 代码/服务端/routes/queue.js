const router = require('express').Router();
const db = require('../models');
const auth = require('../middleware/auth');

router.post('/take', auth, async (req, res, next) => {
  try {
    const { store_id } = req.body;
    if (!store_id) return res.json({ code: 400, message: '请选择门店', data: null });
    const store = await db.Store.findByPk(store_id);
    if (!store) return res.json({ code: 404, message: '门店不存在', data: null });

    const lastQueue = await db.Queue.findOne({
      where: { store_id },
      order: [['queue_no', 'DESC']]
    });
    const queueNo = lastQueue ? lastQueue.queue_no + 1 : 1;

    const queue = await db.Queue.create({
      user_id: req.user.id,
      store_id,
      queue_no: queueNo,
      status: 0
    });
    res.json({ code: 200, message: 'success', data: queue });
  } catch (err) {
    next(err);
  }
});

router.get('/status', auth, async (req, res, next) => {
  try {
    const { store_id } = req.query;
    const where = { user_id: req.user.id };
    if (store_id) where.store_id = store_id;

    const myQueues = await db.Queue.findAll({
      where: { ...where, status: 0 },
      include: [{ model: db.Store, as: 'store', attributes: ['id', 'name'] }],
      order: [['created_at', 'DESC']]
    });

    const result = [];
    for (const q of myQueues) {
      const waitingCount = await db.Queue.count({
        where: { store_id: q.store_id, status: 0, queue_no: { [db.Sequelize.Op.lt]: q.queue_no } }
      });
      result.push({ ...q.toJSON(), waiting_count: waitingCount });
    }
    res.json({ code: 200, message: 'success', data: result });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
