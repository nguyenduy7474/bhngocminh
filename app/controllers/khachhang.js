var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
var Bdngocminh = require('../models/sanpham.js')
const nodemailer = require('nodemailer');
const authgoogle = require('../../config/authgoogleapi');
var dateFormat = require('dateformat');
var Khachhang = require('../models/khachhang.js')



class BHngocminh{
	static DonHang(req, res){
		res.render('donhang.ejs');
	}

	static Tatcadonhang(req, res){
		Khachhang.find({datatype: "khachhang"}, (err, data) => {
			res.send(data)
		})
	}

	static Xulyxong(req, res){
		var iddonhang = req.body.iddonhang
		Khachhang.updateOne({_id: iddonhang, datatype: "khachhang"}, {$set:{tinhtrangdonhang: 1}},(err) => {
			if(err) throw err
			res.send("success")
		})
	}
}

module.exports = BHngocminh


    
