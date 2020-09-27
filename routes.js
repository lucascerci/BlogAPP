const express = require("express");
const routes = express.Router();
const BlogController = require("./src/app/Controller/BlogController");

//HOME ROUTE
routes.get("/", function(req, res) {
    res.redirect("/blogs");
});

//POSTS RESTFUL ROUTES
routes.get("/blogs", BlogController.findPosts);

routes.get("/blogs/new", function(req, res) {
    res.render("new"); 
});

routes.post("/blogs", BlogController.createPost);

routes.get("/blogs/:id", BlogController.findPostToShow);

//EDIT ROUTE
routes.get("/blogs/:id/edit", BlogController.findPostToEdit);

//UPDATE REQUEST
routes.put("/blogs/:id", BlogController.findPostByIdAndUpdate);

//DELETE REQUEST
routes.delete("/blogs/:id", BlogController.findPostByIdAndRemove);

module.exports = routes;