var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campgrounds"),
  seedDB = require("./seeds");

//mock db
mongoose.connect("mongodb://localhost/yelp_camp", { useMongoClient: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
seedDB();

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { campgrounds: campgrounds });
    }
  });
});
app.post("/campgrounds", function(req, res) {
  //get data from form and add to campgrounds array
  var newCampground = {
    name: req.body.name,
    image: req.body.image,
    description: req.body.description
  };
  Campground.create(newCampground, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      console.log(campground + " is created");
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});
//SHOW
app.get("/campgrounds/:id", function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      console.log(foundCampground);
      res.render("show", { campground: foundCampground });
    }
  })
});
app.listen("8080", "127.0.0.1", function() {
  console.log("Server started");
});
