const express  = require('express');
const router = express.Router();
const Book = require('../app/models/Book')
const Cart = require('../app/models/Cart')
const  bookcontroller = require ('../app/controllers/bookcontroller');

router.get('/detail/:id', bookcontroller.detailesProduct);//chi tieets sp
router.post('/addtocart/:id', bookcontroller.appToCart);


module.exports = router;