var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    passport: String
});

// add in some methods to user
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
