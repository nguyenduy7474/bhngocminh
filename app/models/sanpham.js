var mongoose = require('mongoose');

var SanphamSchema = mongoose.Schema({	
	datatype: { type: String, default: "sanpham"},
	tensanpham: { type: String, default: ""},
	tensanphamkhongdau: { type: String, default: ""},
	masanpham: { type: String, default: ""},
	giasanpham: { type: Number, default: 0},
	giakhuyenmai: { type: Number, default: 0},
	donggia: { type: Number, default: 0},
	danhmuc: mongoose.Schema.Types.ObjectId,
	image: { type: String, default: ""}
});

module.exports = mongoose.model('sanpham', SanphamSchema, 'sanpham');