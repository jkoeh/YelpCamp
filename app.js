var express = require("express"),
	app = express();
	bodyParser = require("body-parser");
	mongoose = require("mongoose");

//mock db
mongoose.connect("mongodb://localhost/yelp_camp", { useMongoClient: true });

//Create Schema
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});
//compile the schema and send to db
var Campground = mongoose.model("Campground", campgroundSchema);

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, campgrounds){
		if(err){
			console.log(err);
		}
		else {
			res.render("campgrounds", {campgrounds: campgrounds})
		}
	})	
});
app.post("/campgrounds", function(req, res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: req.body.name, image: req.body.image};
	Campground.create(newCampground, function(err, campground){
		if (err){
			console.log(err);
		} else{
			console.log(campground + " is created");			
			res.redirect("/campgrounds");
		}
	});
	
	
});
app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs")
});
app.listen("8080", "127.0.0.1", function(){
	console.log("Server started");
});