var BHngocminh = require('../app/controllers/home');
var Admin = require('../app/controllers/admin');
var Khachhang = require('../app/controllers/khachhang');


module.exports = function (app, passport) {
    app.get('/', BHngocminh.home);
    app.post('/laytatcasanpham', BHngocminh.GetAllProduct);
    app.post('/dathang', BHngocminh.Order);

    app.post('/apdungmagiamgia', BHngocminh.UseDiscount);
    app.post('/xoamagiamgia', Admin.Loggined, BHngocminh.DeleteDiscount);
    app.post('/taomagiamgia', Admin.Loggined, BHngocminh.AddDiscount);
    app.post('/danhsachmagiamgia', Admin.Loggined, BHngocminh.ListDiscount);


    app.get('/admin', Admin.Loggined, Admin.Adminpage);
    app.post('/suasanpham', Admin.Loggined, Admin.EditProduct);
    app.post('/xoasanpham', Admin.Loggined, Admin.DeleteProduct)

    app.get('/khachhang', Admin.Loggined, Khachhang.DonHang);
    app.post('/tatcadonhang', Admin.Loggined, Khachhang.Tatcadonhang);
    app.post('/xulyxong', Admin.Loggined, Khachhang.Xulyxong);
    app.post('/laymotdonhang', Admin.Loggined, Khachhang.GetOneOrder);

    app.post('/apdungdonggia', Admin.Loggined, Admin.Usesameprice);
    app.post('/phishiphang', Admin.Loggined, Admin.CalShipFee);
    app.post('/loadphiship', Admin.Loggined, Admin.GetShipFee);
    app.post('/xoaapdungdonggia', Admin.Loggined, Admin.Deletesameprice);


    app.get('/login', Admin.login);
    app.get('/signup', Admin.signup);
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/admin', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/admin', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
}
