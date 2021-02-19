const express = require('express');
const app = express();
const specialtyCtrl = require('../controllers/specialtyController');

const router = express.Router();
router.route('/api/specialty')
  .get(specialtyCtrl.specialties);

module.exports = router;