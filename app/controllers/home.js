var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
var Bdngocminh = require('../models/sanpham.js')
const nodemailer = require('nodemailer');
const authgoogle = require('../../config/authgoogleapi');
var dateFormat = require('dateformat');
var Khachhang = require('../models/khachhang.js')
var Magiamgia = require('../models/magiamgia.js')

class BHngocminh{
	static home(req, res){
		res.render('index.ejs');
	}

	static GetAllProduct(req, res){
		Bdngocminh.find({datatype: "sanpham"}, null, {sort: {donggia: -1}}, (err, data) => {
			res.send(data)
		})
	}

	static Order(req, res){
		var now = new Date();
 		var date = dateFormat(now, "d/m/yyyy");
 		console.log(req.body)
		var data = {
			hoten: req.body.hoten,
			sodienthoai: req.body.sdt,
			cacsanpham: req.body.cacsanpham,
			diachi: req.body.diachi,
			email: req.body.email,
			ghichu: req.body.ghichu,
			magiamgia: req.body.magiamgia,
			tongtiensaugiamgia: req.body.tongtiensaugiamgia,
			shipfee: req.body.shipfee,
			ngaydathang: date,
			tinhtrangdonhang: 0 
		}

		var datasave = Khachhang(data)

		datasave.save((err) => {
			if(err) console.log(err)
			res.send("success")
			/*var mailOptions = {
			      from: "nguyenduy7474@gmail.com",
			      to: req.body.email,
			      subject: 'Đã nhận đơn hàng',
			      text: 'dddddd',
			      html: 'Message from: <br></br> Email: <br></br> Message: '
			  };
			var transporter = nodemailer.createTransport({
				 service: 'gmail',
				 auth: authgoogle
			  });
			transporter.sendMail(mailOptions, (err) => {
			      if (err) {
			          return console.log(err);
			      } else {
			          console.log("ok")
			      }
			});*/
		})
	}

	static AddDiscount(req, res){
		var data = {
			magiamgia: req.body.magiamgia,
			sotiengiam: req.body.sotiengiam
		}
		var datasave = Magiamgia(data)
		datasave.save((err) => {
			res.send("success")
		})
	}

	static ListDiscount(req, res){
		Magiamgia.find({datatype: "magiamgia"}, (err, data) => {
			res.send(data)
		})
	}

	static DeleteDiscount(req, res){
		Magiamgia.deleteOne({_id: req.body.idmagiamgia, datatype: "magiamgia"}, (err) => {
			res.send("success")
		})
	}

	static UseDiscount(req, res){
		Magiamgia.findOne({magiamgia: req.body.magiamgia, datatype: "magiamgia"}, (err, data) => {
			if(data){
				res.send(data)
			}else{
				res.send("failed")
			}
		})
	}
}

module.exports = BHngocminh


    
