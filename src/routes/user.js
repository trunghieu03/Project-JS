const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');

router.all('/' , userController.show);
router.get('/search', userController.search);
router.get('/cart', userController.cart);
router.get('/register', userController.register);
router.get('/login', userController.login);
router.get('/trangchu', userController.trangchu);
router.get('/gioithieu', userController.gioithieu);
router.get('/lienhe', userController.lienhe);
router.get('/sanpham', userController.sanpham);

// router.post('/cart/remove', userController.deleteItemCart);
router.post('/created', userController.created);
router.post('/logined', userController.logined);
module.exports = router;