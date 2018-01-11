// import express framework
var express = require('express');
var app = express();

// use get() method to grab the get request message
app.get("/", function(req, res) {
    res.send("Hi there, welcome to my assignment!");
});

// use ':' to just get the pattern of input instead of exactly word
app.get("/speak/:animal", function(req, res) {
    // use object to store the message more easily
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof!",
        cat: "I hate you human",
        goldfish: "..."
    }
    var animal = req.params.animal.toLowerCase();
    var word = sounds[animal];
    // var word = "";
    // if (animal === "pig") {
    //     word = "'Oink'";
    // } else if (animal === "cow") {
    //     word = "'Moo'";
    // } else if (animal === "dog") {
    //     word = "'Woof Woof!'";
    // }
   res.send("The " + animal + " says '" + word + "'"); 
});

app.get("/repeat/:words/:times", function(req, res) {
   var words = req.params.words;
   var times = Number(req.params.times);
   var result = "";
   for (var i = 0;i < times; i++) {
       result += words + " ";
   }
   res.send(result);
// it doesn't work cuz when send at first time, it's done
//   for (var i = 0; i < num; i++) {
//       res.send(words + " ");
//   }
});

// "*" means the all situations when request message send
app.get("*", function(req, res) {
   res.send("Sorry, page not found...What are you doing with your life"); 
});

// must add listen to app.js to make it work
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Now serving your app!");
});
