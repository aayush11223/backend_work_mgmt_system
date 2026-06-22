const express = require('express');
const router = express.Router();
const authController = require('../controller/authController.js');

router.post('/login', authController.login);
router.get('/me', authController.initAuth);

module.exports = router;
