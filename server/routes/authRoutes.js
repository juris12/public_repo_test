const exporess = require('express');
const loginLimiter = require('../middleware/loginLimiter')
const router = exporess();
const {
    loginUser,
    logout,
    refreshToken
} = require('../controllers/authController');


router.route('/')
    .post(loginLimiter, loginUser)
router.route('/refresh')
    .get(refreshToken)
router.route('/logout')
    .post(logout)

module.exports = router;