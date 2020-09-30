const express = require("express");
const routes = express.Router();
const PostController = require("./src/app/Controller/PostController");
const UserController = require("./src/app/Controller/UserController");
const { body } = require('express-validator');

//----------------------------------------------- USER CRUD ---------------------------------------------
//REGISTER ROUTE
routes.get("/register", function(req, res) {
    res.render("register", {isLoggedIn: req.isAuthenticated()});
});

routes.post("/register", [ 
    body('username', 'The username must be 6+ chars long').isLength({ min: 6 }),
    body('email').isEmail(),
    body('password', 'The password must be 8+ chars long and contain a number').isLength({ min: 8 }).matches(/\d/)
], UserController.createUser);


//LOGIN ROUTE
routes.get("/login",
 function(req, res) {
    res.render("login", {isLoggedIn: req.isAuthenticated()});
});

//login logic
routes.post("/login", UserController.login);

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

routes.get('*', function(req, res){
    res.redirect("/posts");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = routes;