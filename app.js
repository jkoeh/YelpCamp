var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campgrounds"),
  Comment = require("./models/comments"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  User = require("./models/users"),
  seedDB = require("./seeds");

//mock db
mongoose.connect("mongodb://localhost/yelp_camp", { useMongoClient: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();
app.use(
  require("express-session")({
    secret: "test",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.get("/", function(req, res) {
  res.render("landing");
});
app.get("/campgrounds", function(req, res) {
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: campgrounds });
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
  res.render("campgrounds/new");
});
//SHOW
app.get("/campgrounds/:id", function(req, res) {
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

// =================
// Comments Routes
// =================
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
  5;
  //find campground by id
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      console.log(campground);
      res.render("comments/new", { campground: campground });
    }
  });
});
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
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
//===========
// AUTH ROUTES
//===========

app.get("/register", function(req, res) {
  res.render("register");
});
app.post("/register", function(req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/campgrounds");
    });
  });
});
//===========
// Login ROUTES
//===========
app.get("/login", function(req, res) {
  res.render("login");
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);
//===========
// Logout ROUTES
//===========
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/campgrounds");
});
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
app.listen("8080", "127.0.0.1", function() {
  console.log("Server started");
});
