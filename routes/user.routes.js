const router = require ('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller.js');

//AUTH
router.post('/register', authController.signUp);

// USER
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);

module.exports = router;