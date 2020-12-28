const express = require('express');
const authCtrl = require('../controllers/authController');

const router = express.Router()

router.route('/api/auth/login')
  .post(authCtrl.logIn);

router.route('/api/auth/logout')
  .get(authCtrl.logOut);

module.exports = router;