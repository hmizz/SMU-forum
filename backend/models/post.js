const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: {type:String, required:true},
    content: {type: String},
    topic: {type: String},
    publisher:{name: String, id: String},
    comment: {type: String}
});

module.exports = mongoose.model("Post", postSchema);