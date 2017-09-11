var mongoose = require("mongoose");
var commentSchema = new mongoose.Schema({
	text: String,
	author: String	
});
//compile the schema and send to db

module.exports = mongoose.model('Comment', commentSchema);