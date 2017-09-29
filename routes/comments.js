var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");

//Comments New
router.get("/new", isLoggedIn, function(req, res) { 
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      console.log(campground);
      res.render("comments/new", { campground: campground });
    }
  });
});
//Comments Create
router.post("/", isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
      redirect("/campgrounds");
    } else {
      console.log(req.user);
      Comment.create(
        {
          author: req.user.username,
          text: req.body.text
        },
        function(err, comment) {
          if (err) {
            console.log(err);
          } else {
            console.log(comment + " added!");
            campground.comments.push(comment);
            campground.save();
            res.redirect("/campgrounds/" + campground._id);
          }
        }
      );
    }
  });
});
//middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
module.exports = router;
