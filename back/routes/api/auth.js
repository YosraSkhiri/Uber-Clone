const express = require('express');
const router = express.Router();
const authContr = require('../../controllers/auth');
const auth = require('../../middlewares/auth');

router.post('/signup', authContr.signup);
router.post('/login', authContr.login);
router.post('/logout', auth, authContr.logout);
router.post('/reset-password', auth, authContr.resetPassword);

module.exports = router;