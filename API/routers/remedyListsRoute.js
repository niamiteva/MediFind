const express = require('express');
const app = express();
const listsCtrl = require('../controllers/remedyListsController');
const remedyCtrl = require('../controllers/remedyController');

const router = express.Router();
router.route('/api/remedylists') 
  .post(listsCtrl.createList);

router.route("/api/remedylists/:id")
  .get(listsCtrl.getRemedyListsByUserId)
  .put(listsCtrl.editRemedyList)
  .delete(listsCtrl.deleteRemedyList);

router.route("/api/remedy/:id")
  .get(remedyCtrl.getRemediesByListId)

router.route("/api/remedy")
  .post(remedyCtrl.createRemedy)

router.route("/api/remedy/:id")
  .put(remedyCtrl.editRemedy);

module.exports = router;