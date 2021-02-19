const express = require('express');
const app = express();
const doctorCtrl = require('../controllers/doctorController');

const router = express.Router();
router.route('/api/doctors')
  .get(doctorCtrl.doctors)

router.route("/api/doctors/:id")
  .get(doctorCtrl.doctorById)
  .put(doctorCtrl.update);

module.exports = router;