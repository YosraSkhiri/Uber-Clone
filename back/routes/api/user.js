const express = require('express');
const router = express.Router();
const userContr = require('../../controllers/user');
const auth = require('../../middlewares/auth');

router.get('/me', auth, userContr.getUser);
router.post('/update', auth, userContr.updateUser);
router.delete('/delete', auth, userContr.deleteUser);

module.exports = router;