var express = require('express');
var app = express();
// request package allow JS to make a request
var request = require('request');
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("search");
});

app.get("/results", function(req, res) {
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
    // make a resquest to this url
    request(url, function(error, response, body) {
        // statusCode is the status that webpage responses, 200 means ok
       if (!error && response.statusCode == 200) {
           // the body that res is string, so we need to parse it into JS object
           var data = JSON.parse(body);
           res.render("results", {data: data});
       } 
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Movie App has started!!!");
});
