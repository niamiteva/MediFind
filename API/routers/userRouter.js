const express = require('express');
const app = express();
const userCtrl = require('../controllers').user;

//TODO: 
//routes with express router:
const router = express.Router();
router.route('/api/users')
  .get(userCtrl.users);
//   .post(userCtrl.create);

router.route("/api/user/:id")
  .get(userCtrl.userById);

router.param('userId', userCtrl.userById);

module.exports = router;