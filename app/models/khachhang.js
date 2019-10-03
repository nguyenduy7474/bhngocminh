var mongoose = require('mongoose');

var CustomerSchema = mongoose.Schema({	
	datatype: { type: String, default: "khachhang"},
	hoten: { type: String, default: ""},
	sodienthoai:{ type: String, default: ""},
	cacsanpham: { type: Array, default: []},
	diachi: { type: String, default: ""},
	email: { type: String, default: ""},
	ghichu: { type: String, default: ""},
	magiamgia: { type: String, default: ""},
	sotiengiam: { type: String, default: ""},
	tongtiensaugiamgia: { type: String, default: ""},
	ngaydathang: { type: String, default: ""},
	timestamp: { type: Date, default: Date.now },
	shipfee: { type: String, default: ""},
	tinhtrangdonhang: { type: Number, default: 0},
});

module.exports = mongoose.model('khachhang', CustomerSchema, 'khachhang');