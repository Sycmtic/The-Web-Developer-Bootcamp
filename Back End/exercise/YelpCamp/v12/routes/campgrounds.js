var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");
// if we require a directory, it will automatically require index doc
var middleware  = require("../middleware");

// instead of adding route to app, we add route to router
// INDEX - show all campgrounds       
router.get("/", function(req, res) {
    // Get all campgrounds from DB
    // use callback function to make sure that only if .find() method finished, the next function execute
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            // req.user contians the user information
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
});

// NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
   var name = req.body.name;
   var price = req.body.price;
   var img = req.body.image;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var newCampground = {name: name, price: price, image: img, description: desc, author: author};
   // Create a new campground and save to DB
   // newCampground is the object that save to DB, newlyCreated is the newly added object that returns from DB
   Campground.create(newCampground, function(err, newlyCreated) {
       if (err) {
           console.log(err);
       } else {
           // redirect back to campgrounds page
           res.redirect("/campgrounds");
       }
   });
});

// SHOW - show more info about one campground
router.get("/:id", function(req, res) {
    // find the campground with provided Id then get the comment data throgh the reference
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            // render show the template with that campground
            res.render("campgrounds/show", {campground: foundCampground});            
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            // redirect to show page
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;
