const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: {type:String, required:true},
    content: {type: String},
    topic: {type: String},
    publisher: {type: String},
    comments: {type: []}
});

module.exports = mongoose.model("Post", postSchema);