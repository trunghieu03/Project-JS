const User = require('../models/User');
const Book = require('../models/Book');
const Cart = require('../models/Cart'); // tuong tac models
const jwt = require('jsonwebtoken');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');

class UserController {


  show(req,res){
    res.render('client/indexClient')
  }
  //SEARCH
  async search(req, res) {
    let { query } = req.query;
    query = query.toLowerCase();
    try {
      // Tìm kiếm các mục trong cơ sở dữ liệu dựa trên query trong trường 'name'
      const searchResults = await Book.find({ name: { $regex: query, $options: 'i' } });
      res.json(searchResults);
    } catch (error) {
      console.error('Error searching:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }


  //GET/ register
  register(req, res, next) {
    res.render('user/register');
  }
  //post /created
  created(req, res, next) {
    const { username, password, email, phone } = req.body;
    const findUserByUsername = User.findOne({ username: username });
    const findUserByEmail = User.findOne({ email: email });

    Promise.all([findUserByUsername, findUserByEmail])
      .then(([userByUsername, userByEmail]) => {
        if (userByUsername) {
          return res.json({ message: "username da ton tại " })
        } else if (userByEmail) {
          return res.json({ message: 'Email da duoc dang ky ' });
        } else if (!userByUsername && !userByEmail) {
          const newUser = new User({ username: username, password: password, email: email, phone: phone, role: "user" });
          newUser.save();
          return res.json({ message: 'Đăng ký thành công' });
        }
      })
      .catch(error => {
        return res.status(500).json({ message: 'Đã xảy ra lỗi ' });
      });
  }

  //get /login
  login(req, res, next) {
    res.render('user/login');
  }
  //post /login
  logined(req, res, next) {
    const { username, password } = req.body;
    console.log(username, password);
    const findUserByUsername = User.findOne({ username: username });
    const findUserByPassword = User.findOne({ password: password });

    Promise.all([findUserByUsername, findUserByPassword])
      .then(([userByUsername, userByPassword]) => {
        if (userByUsername && userByPassword) {
          const token = jwt.sign({ _id: userByUsername._id }, 'mk');
          return res.json({ message: userByUsername.role, token: token })
        } else if (userByUsername && !userByPassword) {
          return res.json({ message: 'sai mat khau ' });
        } else {
          return res.json({ message: 'tai khoan khong ton tai' });
        }
      })
      .catch(error => {
        return res.status(500).json({ message: 'da xay ra loi ' });
      });
  }
  // get: sp //Sử dụng Promises (ngan gon)
  sanpham(req, res, next) {
    Book.find({})
      .then(Books => {     //truyen data lay tu model truyen vao
        res.render('client/sanpham', {     //choc sang view
          Books: mutipleMongooseToObject(Books)
        });
      })
      .catch(next);
  }
  // get gioithieu 
  gioithieu(req, res, next) {
    Book.find({})
      .then(Books => {     //truyen data lay tu model truyen vao
        res.render('client/gioithieu', {     //choc sang view
          Books: mutipleMongooseToObject(Books)
        });
      })
      .catch(next)
    // res.render('client/gioithieu');
  }
  // get lh 
  lienhe(req, res, next) {
    res.render('client/lienhe');
  }
  // get trang chu
  trangchu(req, res, next) {
    Book.find({})
      .then(Books => {     //truyen data lay tu model truyen vao
        res.render('client/indexClient', {     //choc sang view
          Books: mutipleMongooseToObject(Books)
        });
      })
      .catch(next);
    // res.render('client/indexClient')
  }

//hien thi cart
async cart(req, res, next) {
  try {
      const cart = await Cart.findOne().populate('items.bookId');   //lay id book hiện các thong tin sp
      // Xử lý dữ liệu giỏ hàng để gộp các mục có bookId trùng nhau (nếu có)
      const processedItems = [];  //mang luu tru sau khi gop
      const itemMap = new Map();  //mang gop

      for (const item of cart.items) {
          const itemId = item.bookId._id.toString();
          if (itemMap.has(itemId)) {   //có id tuong tu chua
              const existingItem = itemMap.get(itemId);
              existingItem.quantity += item.quantity;
              existingItem.price += item.price * item.quantity; // tổng giá 
          } else {
              itemMap.set(itemId, {
                  bookId: item.bookId,
                  name: item.name,
                  quantity: item.quantity,
                  price: item.price * item.quantity,  // tổng giá 
                  productImage: item.productImage
              });
          }
      }

      processedItems.push(...itemMap.values());

      res.render('client/cart', { cart: { items: processedItems, totalPrice: cart.totalPrice } });
  } catch (error) {
      console.error(error);
      next(error);
  }
}
// async deleteItemCart(req, res, next) {
//   const { id } = req.params;
//   try {
//       // Tìm giỏ hàng trong cơ sở dữ liệu
//       const cart = await Cart.findOne();

//       // Kiểm tra tính hợp lệ của giỏ hàng
//       if (!cart) {
//           return res.status(404).json({ message: 'Cart not found' });
//       }

//       // Tìm vị trí của cuốn sách trong giỏ hàng
//       const index = cart.items.findIndex(item => item.bookId === id);

//       // Nếu không tìm thấy cuốn sách trong giỏ hàng, trả về lỗi 404
//       if (index === -1) {
//           return res.status(404).json({ message: 'Book not found in cart' });
//       }

//       // Xóa cuốn sách khỏi giỏ hàng
//       cart.items.splice(index, 1);

//       // Lưu lại giỏ hàng mới sau khi xóa
//       await cart.save();

//       // Trả về thông báo thành công
//       // return res.status(200).json({ message: 'Book removed from cart successfully' });
//       res.render('client/cart')
//   } catch (error) {
//       // Xử lý lỗi nếu có
//       console.error('Error removing book from cart:', error);
//       return res.status(500).json({ error: 'Internal server error' });
//   }

// }

}
module.exports = new UserController();
