const express = require('express');
const app = express();
const listsCtrl = require('../controllers/remedyListsController');

const router = express.Router();
router.route('/api/remedylists')
  .get(listsCtrl.getRemedyListsByUserId)
  .post(listsCtrl.createList);

router.route("/api/remedylists/:id")
  .put(listsCtrl.editRemedyList);

//router.param('listId', listsCtrl.editRemedyList);

module.exports = router;