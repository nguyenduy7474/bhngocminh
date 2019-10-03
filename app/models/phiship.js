var mongoose = require('mongoose');

var ShipFee = mongoose.Schema({	
	datatype: { type: String, default: "phiship"},
	thongbaoshipfee: { type: String, default: ""},
	shipfee: { type: String, default: ""}
});

module.exports = mongoose.model('phiship', ShipFee, 'phiship');