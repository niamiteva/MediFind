const express = require('express');
const app = express();
const verifyCtrl = require('../controllers/verificationController');

const router = express.Router();
// POST /verication?token=[string]&email=[string]
router.post('/api/verification', verifyCtrl.verify);