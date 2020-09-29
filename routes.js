const express = require("express");
const routes = express.Router();
const BlogController = require("./src/app/Controller/BlogController");
const UserController = require("./src/app/Controller/UserController");

//----------------------------------------------- USER CRUD ---------------------------------------------
//REGISTER ROUTE
routes.get("/register", function(req, res) {
    res.render("register", {isLoggedIn: req.isAuthenticated()});
});

routes.post("/register", UserController.createUser);

//LOGIN ROUTE
routes.get("/login", function(req, res) {
    res.render("login", {isLoggedIn: req.isAuthenticated(), success : false});
});

//login logic
routes.post("/login", passport.authenticate("local", {
    successRedirect: "/blogs",
    failureRedirect: "/login"
}), function(req, res){
    console.log("logado res", res)
});

//logout
routes.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

//----------------------------------------------- POSTS CRUD ---------------------------------------------


//HOME ROUTE
routes.get("/", function(req, res) {
    res.redirect("/blogs");
});

//POSTS RESTFUL ROUTES
routes.get("/blogs", BlogController.findPosts);

routes.get("/blogs/new", function(req, res) {
    res.render("new", {isLoggedIn: req.isAuthenticated()}); 
});

routes.post("/blogs", isLoggedIn, BlogController.createPost);

routes.get("/blogs/:id", BlogController.findPostToShow);

//EDIT ROUTE
routes.get("/blogs/:id/edit", BlogController.findPostToEdit);

//UPDATE REQUEST
routes.put("/blogs/:id", BlogController.findPostByIdAndUpdate);

//DELETE REQUEST
routes.delete("/blogs/:id", BlogController.findPostByIdAndRemove);

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/blogs");
}

module.exports = routes;