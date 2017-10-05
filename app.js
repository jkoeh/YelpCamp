var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campgrounds"),
  Comment = require("./models/comments"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  User = require("./models/users"),
  methodOverride = require("method-override"),
  seedDB = require("./seeds");
  
//requiring routes
var commentRoutes = require("./routes/comments"),
  campgroundsRoutes = require("./routes/campgrounds"),
  indexRoutes = require("./routes/index");
//mock db
mongoose.connect("mongodb://localhost/yelp_camp", { useMongoClient: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//seedDB();
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
app.use(indexRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen("8080", "127.0.0.1", function() {
  console.log("Server started");
});
