var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var User        = require("../models/user");

// root route
router.get("/", function(req, res) {
    res.render("landing");
});

// if you use array to store, when restart, the storage message gone
// var campgrounds = [
//     {name: "Salmon Creek", image:"https://www.photosforclass.com/download/7121865553"},
//     {name: "Granite Hill", image:"https://www.photosforclass.com/download/7930235502"}
//     ];

// ===========
// AUTH ROUTES
// ===========

// show the register form
router.get("/register", function(req, res) {
    res.render("register");
});

// handle sign up logic
router.post("/register", function(req, res) {
    // create a new user
    var newUser = new User({username: req.body.username});
    // register a new user with password which store as hashcode
    User.register(newUser, req.body.password, function(err, user) {
       if (err) {
           console.log(err);
           return res.render("register");
       }
       // if register successful, authenticate it then redirect
       passport.authenticate("local")(req, res, function() {
           res.redirect("/campgrounds");
       });
    });
});

// show login form
router.get("/login", function(req, res) {
    res.render("login");
});
// handling login logic
// middleware run before the callback function usually to check the state
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    }), function(req, res) {
});

// logout route
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

// to check if the user has logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
