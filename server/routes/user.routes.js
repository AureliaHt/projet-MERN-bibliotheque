const router = require ('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller.js');
const {loginAccountLimiter} = require('../helpers/rateLimiter');

//AUTH
router.post('/register', authController.signUp);
router.post('/login', loginAccountLimiter, authController.signIn);
router.get('/logout', authController.logout);

// USER
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;