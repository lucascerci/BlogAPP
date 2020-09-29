const express = require("express");
const routes = express.Router();
const PostController = require("./src/app/Controller/PostController");
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
    successRedirect: "/posts",
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
    res.redirect("/posts");
});

//POSTS RESTFUL ROUTES
routes.get("/posts", PostController.findPosts);

routes.get("/posts/new", isLoggedIn, function(req, res) {
    res.render("new", {isLoggedIn: req.isAuthenticated()}); 
});

routes.post("/posts", isLoggedIn, PostController.createPost);

routes.get("/posts/:id", PostController.findPostToShow);

//EDIT ROUTE
routes.get("/posts/:id/edit", PostController.findPostToEdit);

//UPDATE REQUEST
routes.put("/posts/:id", PostController.findPostByIdAndUpdate);

//DELETE REQUEST
routes.delete("/posts/:id", PostController.findPostByIdAndRemove);

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = routes;