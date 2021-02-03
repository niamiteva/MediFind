const express = require('express');
const app = express();
const verifyCtrl = require('../controllers/verificationController');

const router = express.Router();
router.post('/verification', VerificationController);