var express     = require("express");
// merge the param from campground and comment together in order to get the id in app.use()
var router      = express.Router({mergeParams: true});
var Campground  = require("../models/campground");
var Comment     = require("../models/comment");

// Comments New
// use middleware to check the login state
router.get("/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
                res.render("comments/new", {campground: campground});
        }
    });
});

// Comments Create
// put the isLoggedIn method to prevent the user type directly to this URL
router.post("/", isLoggedIn, function(req, res) {
    // lookup campground using Id
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    // redirect campground show page
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// middleware to check if the user has logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
