const express  = require('express');
const router = express.Router(); //ket noi dg dan de tao collection tren database

const  adminController = require('../app/controllers/AdminController')
router.get('/', adminController.ShowIndexAdmin);
router.get('/addsanpham', adminController.addsanpham);
router.post('/added', adminController.added);
router.get('/update/:id', adminController.updatesanpham);
router.put('/saveUpdate/:id', adminController.saveUpdatesanpham);
router.delete('/delete/:id', adminController.deletesanpham);
module.exports = router;