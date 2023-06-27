const express = require('express');
const router = express.Router();
const {sendOTP,login,signup} = require('../controllers/auth');
const {changePassword} = require('../controllers/changePassword');
const {resetPassword,resetPasswordToken} = require('../controllers/resetPassword');
const {auth} = require('../middlewears/authMiddlewear');

router.post('/login',login);
router.post('/signup',signup);
router.post('/sendOTP',sendOTP);
router.post('/changePassword',auth,changePassword);
router.post('/reset-password-token',resetPasswordToken);
router.post('/reset-password',resetPassword);

module.exports = router