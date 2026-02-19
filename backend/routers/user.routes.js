const express= require('express');
const router= express.Router();
const authMiddleware= require('../middlewares/authMiddleware');
const userController= require('../controllers/user.controller');

router.post('/register',userController.register);
router.post('/login',userController.login);
router.get('/profile',authMiddleware.authMiddleware,userController.getProfile);
router.get('/logout',userController.logout);

module.exports=router;