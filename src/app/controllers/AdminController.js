const { mongooseToObject } = require('../../util/mongoose')
const Book = require('../models/Book'); // thêm models book vao
class AdminController {
    //GET/ admin
    ShowIndexAdmin(req, res, next) {
        res.render('admin/indexAdmin');
    }

    //GET/ admin/addsp
    addsanpham(req, res, next) {
        Book.find({})
            .then(Books => {
                Books = Books.map(Books => Books.toObject())
                res.render('admin/addsanpham', {
                    Books: Books
                })
            })
            .catch(next);
    }

    // post [addmin/add sp]
    added(req, res, next) {
        const { name, price, productImage, productDescription } = req.body;
        const newBook = new Book({ name: name, price: price, productImage: productImage, productDescription: productDescription });
        newBook.save();
        return res.json({ message: 'Thêm thành công' });
    }



    updatesanpham(req, res, next) {
        Book.findById(req.params.id)
            .then(book => res.render('admin/suasanpham', {
                book: mongooseToObject(book)
            }))
            .catch(next);

    }


    saveUpdatesanpham(req, res, next) {
        Book.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.render('admin/suasanpham'))
            .catch(next);

    }


    deletesanpham(req,res,next){
        Book.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}
module.exports = new AdminController();
