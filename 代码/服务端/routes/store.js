const router = require('express').Router();
const db = require('../models');

function checkIsOpen(businessHours) {
  if (!businessHours) return true;
  const parts = businessHours.split('-');
  if (parts.length < 2) return true;
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const [openH, openM] = parts[0].trim().split(':').map(Number);
  const [closeH, closeM] = parts[1].trim().split(':').map(Number);
  const openMinutes = openH * 60 + (openM || 0);
  const closeMinutes = closeH * 60 + (closeM || 0);
  return currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
}

function calcDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function formatStore(store, distanceValue) {
  const s = store.toJSON ? store.toJSON() : store;
  const hours = (s.business_hours || '07:00-22:00').split('-');
  return {
    ...s,
    images: typeof s.images === 'string' ? JSON.parse(s.images) : (s.images || []),
    open_time: hours[0] || '07:00',
    close_time: hours[1] || '22:00',
    isOpen: checkIsOpen(s.business_hours),
    rating: s.rating ? Number(s.rating).toFixed(1) : '4.8',
    reviews: s.reviews || 0,
    distance: distanceValue !== undefined && distanceValue !== null ? Number(distanceValue).toFixed(1) : null
  };
}

router.get('/', async (req, res, next) => {
  try {
    const { latitude, longitude } = req.query;
    const userLat = latitude ? parseFloat(latitude) : NaN;
    const userLng = longitude ? parseFloat(longitude) : NaN;
    const hasLocation = !isNaN(userLat) && !isNaN(userLng);

    let stores = await db.Store.findAll({ where: { status: 1 } });

    let result = stores.map(s => {
      let dist;
      if (hasLocation && s.latitude && s.longitude) {
        dist = calcDistance(userLat, userLng, s.latitude, s.longitude);
      }
      return formatStore(s, dist);
    });

    if (hasLocation) {
      result.sort((a, b) => {
        if (a.distance === null) return 1;
        if (b.distance === null) return -1;
        return parseFloat(a.distance) - parseFloat(b.distance);
      });
    }

    res.json({ code: 200, message: 'success', data: result });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { latitude, longitude } = req.query;
    const userLat = latitude ? parseFloat(latitude) : NaN;
    const userLng = longitude ? parseFloat(longitude) : NaN;
    const hasLocation = !isNaN(userLat) && !isNaN(userLng);

    const store = await db.Store.findByPk(req.params.id);
    if (!store) return res.status(404).json({ code: 404, message: '门店不存在', data: null });

    let dist;
    if (hasLocation && store.latitude && store.longitude) {
      dist = calcDistance(userLat, userLng, store.latitude, store.longitude);
    }

    const result = formatStore(store, dist);
    res.json({ code: 200, message: 'success', data: result });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
