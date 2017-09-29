var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");

//index route
router.get("/", function(req, res) {
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: campgrounds });
    }
  });
});
//create route
router.post("/", function(req, res) {
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
      res.redirect("/");
    }
  });
});
//new route
router.get("/new", function(req, res) {
  res.render("campgrounds/new");
});
//SHOW
router.get("/:id", function(req, res) {
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundCampground);
        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
});

module.exports = router;
