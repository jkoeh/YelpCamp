var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var middleware = require("../middleware");
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
router.post("/", middleware.isLoggedIn, function(req, res) {
  //get data from form and add to campgrounds array
  var newCampground = {
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    author: {
      id: req.user._id,
      username: req.user.username
    }
  };
  Campground.create(newCampground, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      console.log(campground._id);
      res.redirect("/campgrounds/" + campground._id);
    }
  });
});
//new route
router.get("/new", middleware.isLoggedIn, function(req, res) {
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
        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
});
//EDIT ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnerShip, function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    res.render("campgrounds/edit", { campground: foundCampground });
  });
});

//UPDATE ROUTE
router.put("/:id", middleware.checkCampgroundOwnerShip, function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(
    err,
    updatedCampground
  ) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});
//DELETE ROUTE
router.delete("/:id", middleware.checkCampgroundOwnerShip, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

//middleware


module.exports = router;
