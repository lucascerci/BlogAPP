const mongoose = require("mongoose");

const savedPostsSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
});

module.exports = mongoose.model("SavedPosts", savedPostsSchema);