var express     = require("express"),
    app         = express(),
    // body-parser took the form request body and parsed it to JS object
    bodyParser  = require('body-parser'),
    // mongoose allow you write mongoDB in JS
    mongoose    = require("mongoose");

// set up default mongoose connection to a certain mongodb database
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
// set the default file type as ejs
app.set("view engine", "ejs");
// tell express to use body-parser
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.render("landing");
});

// SCHEMA setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

// tell the mongoose Campground database to use this schema
// The first argument is the singular name of the collection that will be created for your mode
var Campground = mongoose.model("Campground", campgroundSchema);

// if you use array to store, when restart, the storage message gone
// var campgrounds = [
//     {name: "Salmon Creek", image:"https://www.photosforclass.com/download/7121865553"},
//     {name: "Granite Hill", image:"https://www.photosforclass.com/download/7930235502"}
//     ];

// INDEX - show all campgrounds       
app.get("/campgrounds", function(req, res) {
    // Get all campgrounds from DB
    // use callback function to make sure that only if .find() method finished, the callback function execute
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

// CREATE - add new campground to DB
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
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
    // find the campground with provided Id
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            // render show the template with that campground
            res.render("show", {campground: foundCampground});            
        }
    });

});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Yelp app has started!");
});
