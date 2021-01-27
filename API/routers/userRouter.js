const express = require('express');
const app = express();
const userCtrl = require('../controllers/userController');

//TODO: 
//routes with express router:
const router = express.Router();
router.route('/api/users')
  .get(userCtrl.users)
  .post(userCtrl.create);

router.route("/api/users/:id")
  .get(userCtrl.userById);

router.param('userId', userCtrl.userById);

module.exports = router;