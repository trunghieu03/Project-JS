
const Book = require('../models/Book');
const Cart = require('../models/Cart');
const { mongooseToObject } = require('../../util/mongoose');
// const { default: mongoose } = require('mongoose');
class bookcontroller {
    //GET/ book/:id
    detailesProduct(req, res, next) {
        Book.findOne({ _id: req.params.id })
            .then(book => {
                res.render('client/detailsProduct', { book: mongooseToObject(book) });
            })
            .catch(next);
    }

    async appToCart(req, res) {
        const { id } = req.params;
        const { quantity } = req.body;
        const book = await Book.findById(id);
        try {
            if (!book) {
                res.render('client/detailsProduct', { book: mongooseToObject(book), errorMessage: 'Sách không tồn tại' });
                return;
            }
            if (!quantity ) {
                res.render('client/detailsProduct', { book: mongooseToObject(book), errorMessage: 'Vui lòng nhập số lượng cần mua' });
                return;
            }
            let cart = await Cart.findOne();
    
            if (!cart) {
                cart = new Cart({ items: [], totalPrice: 0 });
            }
    
            const existingItemIndex = cart.items.findIndex(item => item.bookId === id);
    
            if (existingItemIndex !== -1) {
                cart.items[existingItemIndex].quantity += parseInt(quantity, 10);
            } else {
                cart.items.push({
                    bookId: book._id,
                    name: book.name,
                    quantity: parseInt(quantity, 10),
                    price: book.price,
                    productImage: book.productImage
                });
            }
    
            cart.totalPrice += parseInt(quantity, 10) * book.price;
    
            await cart.save();
            res.render('client/detailsProduct', { book: mongooseToObject(book), successMessage: 'Sản phẩm đã được thêm vào giỏ hàng' });
        } catch (error) {
            console.error(error);
            res.render('client/detailsProduct', { book: mongooseToObject(book), errorMessage: 'Lỗi khi thêm sản phẩm vào giỏ hàng' });
        }
    }

}
module.exports = new bookcontroller();
