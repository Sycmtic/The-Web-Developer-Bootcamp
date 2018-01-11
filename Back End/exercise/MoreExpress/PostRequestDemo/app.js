var express = require("express");
var app = express();
// body-parser took the request body and parsed it to JS object
var bodyParser = require("body-parser");

// tell express to use body-parser
app.use(bodyParser.urlencoded({extended: true}));
// to tell express that the file used is .ejs so we don't need to type .ejs each time
app.set("view engine", "ejs");

var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/friends", function(req, res) {
    // pass the variable to friends template
    res.render("friends", {friends: friends});
});

// listen to the post request
app.post("/addfriend", function(req, res) {
    // use after install body-parser
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    // use redirect() method to redirect to given route
    res.redirect("/friends");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server started!!!");
});
