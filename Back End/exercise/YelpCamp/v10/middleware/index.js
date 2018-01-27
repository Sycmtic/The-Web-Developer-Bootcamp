var Campground = require("../models/campground");
var Comment = require("../models/comment");

// all the middleware goes here
var middlewareObj = {};

// middleware to check the ownership of campground
middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    // is user login?
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            if (err) {
                res.redirect("back");
            } else {
                // does user own the campground?
                // req.user._id is a string, foundCampground.author.id is an object so we use mongoose .equals() method to compare
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        // take the user to where they came from
        res.redirect("back");
    }
};

// middleware to check the ownership of comment
middlewareObj.checkCommentOwnership = function(req, res, next) {
    // is user login?
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                res.redirect("back");
            } else {
                // does user own the comment?
                // req.user._id is a string, foundComment.author.id is an object so we use mongoose .equals() method to compare
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        // take the user to where they came from
        res.redirect("back");
    }
};

// middleware to check if the user has logged in
middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

module.exports = middlewareObj;
