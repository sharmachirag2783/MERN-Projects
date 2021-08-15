const userController = require('../controllers/usercontroller');
const router = require('express').Router();
//@POST route
//@DESC User Signup
router.post('/register', userController.signup);
router.post('/login', userController.login);
module.exports = router;
