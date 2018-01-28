var express             = require("express"),
    app                 = express(),
    // body-parser is used to get the data out of form: the form send data to request body body-parser parsed it to JS object
    bodyParser          = require('body-parser'),
    // mongoose allow you write mongoDB in JS
    mongoose            = require("mongoose"),
    flash               = require("connect-flash"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    methodOverride      = require("method-override"),
    User                = require("./models/user"),
    seedDB              = require("./seeds");
    
// requiring routes
var commentRoutes       = require("./routes/comments"),
    indexRoutes         = require("./routes/index"),
    campgroundRoutes    = require("./routes/campgrounds");

// set up default mongoose connection to a certain mongodb database
mongoose.connect("mongodb://localhost/yelp_camp_v12", {useMongoClient: true});
// set the default file type as ejs
app.set("view engine", "ejs");
// tell express to use body-parser
app.use(bodyParser.urlencoded({extended: true}));
// tell express to use our own stylesheet
// __dirname get current directory path
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

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

app.use(function(req, res, next) {
    // add user to all routes
    res.locals.currentUser = req.user;
    // add feedback message to all routes
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    // remember to add next() method
    next();
});

// add prefix to the route to clean up
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Yelp app has started!");
});
