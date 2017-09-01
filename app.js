var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//mock db
const campgrounds =[
	{name: "Salmon Creek", image: "https://c2.staticflickr.com/4/3892/14368148800_134f664a01_b.jpg"},
	{name: "GrandCanyon", image: "https://www.grandcanyonwest.com/files/3456/gcw-hp-canyonsunset.jpg"},
	{name: "Mountain Goat's Rest", image: "http://media.istockphoto.com/photos/young-mountain-goats-picture-id116632967?k=6&m=116632967&s=612x612&w=0&h=7Z_rvtHTGS8rdQN_crxMGH0iI3nVNcIOmwM2lYCg2HQ="},
		{name: "Salmon Creek", image: "https://c2.staticflickr.com/4/3892/14368148800_134f664a01_b.jpg"},
	{name: "GrandCanyon", image: "https://www.grandcanyonwest.com/files/3456/gcw-hp-canyonsunset.jpg"},
	{name: "Mountain Goat's Rest", image: "http://media.istockphoto.com/photos/young-mountain-goats-picture-id116632967?k=6&m=116632967&s=612x612&w=0&h=7Z_rvtHTGS8rdQN_crxMGH0iI3nVNcIOmwM2lYCg2HQ="},
		{name: "Salmon Creek", image: "https://c2.staticflickr.com/4/3892/14368148800_134f664a01_b.jpg"},
	{name: "GrandCanyon", image: "https://www.grandcanyonwest.com/files/3456/gcw-hp-canyonsunset.jpg"},
	{name: "Mountain Goat's Rest", image: "http://media.istockphoto.com/photos/young-mountain-goats-picture-id116632967?k=6&m=116632967&s=612x612&w=0&h=7Z_rvtHTGS8rdQN_crxMGH0iI3nVNcIOmwM2lYCg2HQ="}
	];
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	
	res.render("campgrounds", {campgrounds: campgrounds});
});
app.post("/campgrounds", function(req, res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	campgrounds.push({name: name, image: image});
	res.redirect("/campgrounds");
	//redirect back to campground page
});
app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs")
});
app.listen("8080", "127.0.0.1", function(){
	console.log("Server started");
});