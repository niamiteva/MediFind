const express = require("express");
const searchCtrl = require("../controllers/searchController");
const doctorCtrl = require("../controllers/doctorController");
const router = express.Router();

router.route("/api/search/remedy").post(searchCtrl.search);

router.route("/api/search/doctors").post(doctorCtrl.searchDoctors);

module.exports = router;
