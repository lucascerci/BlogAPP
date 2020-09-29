const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    image: String,
    body: String,
    hidden: Boolean,
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Post", postSchema);