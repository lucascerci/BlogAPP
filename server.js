const express               = require("express");
const db                    = require("./src/database/config");
const mongoose              = require("mongoose");
const bodyParser            = require("body-parser");
const methodOverride        = require("method-override");
const passport              = require("passport");
const User                  = require("./src/app/Models/User");
const serverless            = require('serverless-http');

class App {
  constructor() {
    this.express = express();

    this.database();
    this.middlewares();
    this.routes();

    this.express.listen(3000, () =>
      console.log(`API REST está funcionando na porta 3000 `)
    );
  }

  database() {
    mongoose.connect(db.uri, { useNewUrlParser: true, useUnifiedTopology: true });
  }

  middlewares() {
    this.express.set('view engine', 'ejs');
    this.express.set('views', './src/app/Views');
    this.express.use('/public', express.static('public'));
    this.express.use(express.json());
    this.express.use(bodyParser.urlencoded({extended: true}));
    this.express.use(methodOverride("_method"));
    this.express.use(require("express-session")({
      secret: "Rusty is the best and cutest dog in the world", //secret is used to encode and decode the sections
      resave: false,
      saveUninitialized: false
    }));
    this.express.use(passport.initialize());
    this.express.use(passport.session());

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
  }

  routes() {
    this.express.use(require("./routes"));
  }
}

handler = serverless(new App().express);

exports.handler = async (event, context) => {
  return await handler(event, context);
};