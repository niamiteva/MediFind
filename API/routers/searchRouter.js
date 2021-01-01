const express = require('express');
const searchCtrl = require('../controllers/searchController');
const router = express.Router();

router.route('/api/search/remedy')
  .post(searchCtrl.search);

module.exports = router;