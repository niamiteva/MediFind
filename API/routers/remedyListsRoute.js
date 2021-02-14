const express = require('express');
const app = express();
const listsCtrl = require('../controllers/remedyListsController');

const router = express.Router();
router.route('/api/remedylists') 
  .post(listsCtrl.createList);

router.route("/api/remedylists/:id")
  .get(listsCtrl.getRemedyListsByUserId)
  .put(listsCtrl.editRemedyList);

router.param('userId', listsCtrl.getRemedyListsByUserId);

module.exports = router;