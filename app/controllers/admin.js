var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
var Bdngocminh = require('../models/sanpham.js')
var Magiamgia = require('../models/magiamgia.js')
var ShipFee = require('../models/phiship.js')

class Admin{
	static Adminpage(req, res){
		res.render('admin.ejs');
	}

	static Loggined(req, res, next){
		if (req.session.user) { // req.session.passport._id

			next();

		} else {

			res.redirect('/login');

		}
	}

	static login(req, res){
		if (req.session.user) {

			res.redirect('/admin');

		} else {

			res.render('login', {
				error : req.flash("error"),
				success: req.flash("success"),
				session: req.session
			});

		}
	}

	static signup(req, res){
		if (req.session.user) {

			res.redirect('/admin');

		} else {

			res.render('signup', {
				error : req.flash("error"),
				success: req.flash("success"),
				session:req.session
			});
		}
	}

	static EditProduct(req, res){
		var sanpham = req.body
		
		if(sanpham.id){
			Bdngocminh.findOne({_id: sanpham.id}, (err, data) => {
				if(err) throw err
				data.tensanpham = sanpham.tensanpham
				data.masanpham = sanpham.masanpham
				data.giasanpham = sanpham.giasanpham
				data.giakhuyenmai = sanpham.giakhuyenmai
				data.image = sanpham.image
				data.save((errsave) => {
					if(errsave) throw errsave
					res.send("success")
				})
			})
		}else{
			var tensanphamkhongdau = sanpham.tensanpham.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
			sanpham.tensanphamkhongdau = tensanphamkhongdau
			var datasave = Bdngocminh(sanpham)
			datasave.save((err) => {
				if(err) throw err
				res.send("success")
			})
		}

	}

	static DeleteProduct(req, res){
		var sanpham = req.body
		Bdngocminh.remove({_id: sanpham.id}, (err) => {
			if(err) throw err
			res.send("success")
		})
	}

	static Usesameprice(req, res){
		Bdngocminh.updateMany({_id: {$in: req.body.arraysanphamdacheck}}, {$set: {donggia: 0}}, (err) => {
			if(err) throw err
			Bdngocminh.updateMany({_id: {$in: req.body.arraysanpham}}, {$set: {donggia: parseInt(req.body.donggia)}}, (err2) => {
				if(err2) throw err2
				res.send("success")
			})
		})


	}

	static Deletesameprice(req, res){
		Bdngocminh.updateMany({datatype: "sanpham"}, {$set: {donggia: 0}}, (err) => {
			if(err) throw err
			res.send("success")
		})
	}

	static CalShipFee(req, res){
		ShipFee.updateOne({datatype: "phiship"}, {$set: {shipfee: req.body.shipfee, thongbaoshipfee: req.body.thongbaoshipfee}}, (err) => {
			if(err) throw err
			res.send("success")
		})
	}

	static GetShipFee(req, res){
		ShipFee.findOne({datatype: "phiship"}, (err, data) =>{
			if(err) throw err
			res.send(data)
		})
	}

}

module.exports = Admin
