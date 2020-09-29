const User = require('../Models/User');
passport              = require("passport"),
LocalStrategy         = require("passport-local")

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

class UserController {
    async createUser(req, res) {
      await User.register(new User({username: req.body.username}), req.body.password)
      .then((response) => {
          console.log("response", response)
          passport.authenticate("local")(req, res, function(){
            res.redirect("/blogs");
          });
      })
      .catch(err => { 
          console.log("erro ao criar um usuario", err) 
          return res.render('register');
       })
    }

    //login logic
    //middleware is some code that runs before our final route callback 
    async loginUser(req, res) {
      passport.authenticate("local", {
        successRedirect: "/blogs",
        failureRedirect: "/login"
    }), function(req, res){
      console.log("logado ? res", res)
    };
    }

}
  
  module.exports = new UserController();