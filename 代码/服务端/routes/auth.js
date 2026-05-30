const router = require('express').Router();
const jwt = require('jsonwebtoken');
const axios = require('axios');
const db = require('../models');
const config = require('../config');
const auth = require('../middleware/auth');

function generateToken(user) {
  return jwt.sign(
    { id: user.id, openid: user.openid },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
}

router.post('/login', async (req, res, next) => {
  try {
    const { code, nickname, avatar_url } = req.body;

    if (code && code !== 'mock' && config.wx.appid && config.wx.secret) {
      const wxRes = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
        params: {
          appid: config.wx.appid,
          secret: config.wx.secret,
          js_code: code,
          grant_type: 'authorization_code'
        }
      });
      if (wxRes.data.errcode) {
        return res.json({ code: 400, message: '微信登录失败: ' + wxRes.data.errmsg, data: null });
      }
      const openid = wxRes.data.openid;
      let user = await db.User.findOne({ where: { openid } });
      if (!user) {
        user = await db.User.create({ openid, nickname: nickname || '咖啡爱好者', avatar_url });
      } else if (nickname) {
        await user.update({ nickname, avatar_url });
      }
      return res.json({ code: 200, message: 'success', data: { token: generateToken(user), userInfo: user } });
    }

    const mockOpenid = 'mock_' + (nickname || 'user') + '_' + Date.now();
    let user = await db.User.findOne({ where: { openid: 'mock_default' } });
    if (!user) {
      user = await db.User.create({
        openid: 'mock_default',
        nickname: nickname || '咖啡爱好者',
        avatar_url: avatar_url || ''
      });
    }
    res.json({ code: 200, message: 'success', data: { token: generateToken(user), userInfo: user } });
  } catch (err) {
    next(err);
  }
});

router.get('/profile', auth, async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.user.id, {
      include: [{ model: db.MemberLevel, as: 'levelInfo' }]
    });
    if (!user) return res.status(404).json({ code: 404, message: '用户不存在', data: null });
    res.json({ code: 200, message: 'success', data: user });
  } catch (err) {
    next(err);
  }
});

router.put('/profile', auth, async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ code: 404, message: '用户不存在', data: null });
    
    const { nickname, avatar_url, phone, gender, birthday, email } = req.body;
    
    const updateData = {};
    if (nickname !== undefined) updateData.nickname = nickname;
    if (avatar_url !== undefined) updateData.avatar_url = avatar_url;
    if (phone !== undefined) updateData.phone = phone;
    if (gender !== undefined) updateData.gender = gender;
    if (birthday !== undefined) updateData.birthday = birthday;
    if (email !== undefined) updateData.email = email;
    
    await user.update(updateData);
    
    const updatedUser = await db.User.findByPk(req.user.id, {
      include: [{ model: db.MemberLevel, as: 'levelInfo' }]
    });
    
    res.json({ code: 200, message: 'success', data: updatedUser });
  } catch (err) {
    next(err);
  }
});

router.post('/phone', auth, async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ code: 404, message: '用户不存在', data: null });
    await user.update({ phone: req.body.phone });
    res.json({ code: 200, message: 'success', data: null });
  } catch (err) {
    next(err);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.json({ code: 400, message: '手机号和密码不能为空', data: null });
    }

    const existingUser = await db.User.findOne({ where: { phone } });
    if (existingUser) {
      return res.json({ code: 400, message: '该手机号已注册', data: null });
    }

    const user = await db.User.create({
      phone,
      password,
      nickname: '咖啡爱好者'
    });

    res.json({ code: 200, message: '注册成功', data: { token: generateToken(user), userInfo: user } });
  } catch (err) {
    next(err);
  }
});

router.post('/phone-login', async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.json({ code: 400, message: '手机号和密码不能为空', data: null });
    }

    const user = await db.User.findOne({ where: { phone } });
    if (!user) {
      return res.json({ code: 400, message: '用户不存在，请先注册', data: null });
    }

    if (user.password !== password) {
      return res.json({ code: 400, message: '密码错误', data: null });
    }

    res.json({ code: 200, message: '登录成功', data: { token: generateToken(user), userInfo: user } });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
