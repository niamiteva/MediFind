const express = require('express');
const app = express();
const userCtrl = require('../controllers/userController');

const router = express.Router();
router.route('/api/users')
  .get(userCtrl.users)
  .post(userCtrl.create);

router.route("/api/users/:id")
  .get(userCtrl.userById)
  .put(userCtrl.update);

router.param('userId', userCtrl.userById);

module.exports = router;