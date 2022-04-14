const router = require ('express').Router();
const authController = require('../../controllers/auth.controller');
const {loginAccountLimiter} = require('../../helpers/rateLimiter');

router.post('/login', loginAccountLimiter, authController.signIn);
router.get('/logout', authController.logout);

module.exports = router;