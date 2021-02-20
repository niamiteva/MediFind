const express = require('express');
const app = express();
const userCtrl = require('../controllers/userController');

const router = express.Router();
router.route('/api/users')
  .get(userCtrl.users)
  .post(userCtrl.create);

router.route("/api/users/:id")
  .get(userCtrl.userById)
  .put(userCtrl.update)
  .post(userCtrl.relateToDoctor);

router.route("/api/users/:id/doctors")
  .get(userCtrl.getPatientsDoctors);

router.param('userId', userCtrl.userById);

module.exports = router;