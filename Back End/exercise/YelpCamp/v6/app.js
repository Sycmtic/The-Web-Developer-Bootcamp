var express         = require("express"),
    app             = express(),
    // body-parser is used to get the data out of form: the form send data to request body body-parser parsed it to JS object
    bodyParser      = require('body-parser'),
    // mongoose allow you write mongoDB in JS
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");

// set up default mongoose connection to a certain mongodb database
mongoose.connect("mongodb://localhost/yelp_camp_v6", {useMongoClient: true});
// set the default file type as ejs
app.set("view engine", "ejs");
// tell express to use body-parser
app.use(bodyParser.urlencoded({extended: true}));
// tell express to use our own stylesheet
// __dirname get current directory path
app.use(express.static(__dirname + "/public"))
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "This is a secret page",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// All below is come with passport-local-mongoose in user.js
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// add user to all routes
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    // remember to add next() method
    next();
})

app.get("/", function(req, res) {
    res.render("landing");
});

// if you use array to store, when restart, the storage message gone
// var campgrounds = [
//     {name: "Salmon Creek", image:"https://www.photosforclass.com/download/7121865553"},
//     {name: "Granite Hill", image:"https://www.photosforclass.com/download/7930235502"}
//     ];

// INDEX - show all campgrounds       
app.get("/campgrounds", function(req, res) {
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

// CREATE - add new campground to DB
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});

// NEW - show form to create new campground
app.post("/campgrounds", function(req, res) {
   var name = req.body.name;
   var img = req.body.image;
   var desc = req.body.description;
   var newCampground = {name: name, image: img, description: desc};
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
app.get("/campgrounds/:id", function(req, res) {
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

// COMMENTS ROUTES
// use middleware to check the login state
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
                res.render("comments/new", {campground: campground});
        }
    });
});

// put the isLoggedIn method to prevent the user type directly to this URL
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
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

// ===========
// AUTH ROUTES
// ===========

// show the register form
app.get("/register", function(req, res) {
    res.render("register");
});
// handle sign up logic
app.post("/register", function(req, res) {
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
app.get("/login", function(req, res) {
    res.render("login");
});
// handling login logic
// middleware run before the callback function usually to check the state
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    }), function(req, res) {
});

// logout route
app.get("/logout", function(req, res) {
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

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Yelp app has started!");
});
