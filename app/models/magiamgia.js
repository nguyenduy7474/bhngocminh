var mongoose = require('mongoose');

var MagiamgiaSchema = mongoose.Schema({	
	datatype: { type: String, default: "magiamgia"},
	magiamgia: { type: String, default: ""},
	sotiengiam: { type: String, default: ""}
});

module.exports = mongoose.model('magiamgia', MagiamgiaSchema, 'magiamgia')