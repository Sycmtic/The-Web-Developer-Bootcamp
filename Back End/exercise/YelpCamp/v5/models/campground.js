var mongoose = require("mongoose");

// SCHEMA setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// tell the mongoose Campground database to use this schema
// The first argument is the singular name of the collection that will be created for your mode
module.exports = mongoose.model("Campground", campgroundSchema);
