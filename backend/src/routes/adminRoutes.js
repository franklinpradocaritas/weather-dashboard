const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/users/:userId', adminController.getUserById);
router.get('/users/username/:username', adminController.getUserByUsername);
router.post('/users', adminController.addUser);
router.delete('/users', adminController.deleteUserByUsername);

module.exports = router;
