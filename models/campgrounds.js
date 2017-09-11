var mongoose = require("mongoose");
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId, 
			ref: "Comment"
		}
	]
});
//compile the schema and send to db

module.exports = mongoose.model("Campground", campgroundSchema);