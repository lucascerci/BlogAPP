const User = require('../Models/User');
passport              = require("passport"),
LocalStrategy         = require("passport-local")
const { validationResult } = require('express-validator');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

class UserController {
    async createUser(req, res) {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        errors.errors = errors.errors.filter((error, index, self) =>
        index === self.findIndex((t) => (
          t.msg === error.msg
        )))
        
        return res.render('register', {
          errors: errors.errors,
          isLoggedIn: req.isAuthenticated()
        })
      }

      await User.register(new User({username: req.body.username}), req.body.password)
      .then(() => {
          passport.authenticate("local")(req, res, function(){
            res.redirect("/posts");
          });
      })
      .catch(err => { 
          console.log("erro ao criar um usuario", err) 
          return res.render('register');
       })
    }



    //login logic
    //middleware is some code that runs before our final route callback 
    async login(req, res, next){
      passport.authenticate('local', function(err, user, info) {
        if (!user) {
          var message = "Invalid credentials";
          return res.render('login', {message: message, isLoggedIn: req.isAuthenticated()});
        }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          req.session.user = req.user;
          res.redirect('/posts');
        });
      })(req, res, next);
    };
}

function removeDuplicates(array) {
  let x = {};
  array.forEach(function(i) {
    if(!x[i]) {
      x[i] = true
    }
  })
  return Object.keys(x)
};

module.exports = new UserController();