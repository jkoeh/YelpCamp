var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var userSchema = new mongoose.Schema({
	username: String,
	password: String	
});
//compile the schema and send to db
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);