const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth-web');

router.post('/login', auth.login);
router.get('/logout', auth.logout);
router.post('/register', auth.register);

module.exports = router;