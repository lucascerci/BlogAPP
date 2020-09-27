const express = require("express");
const db = require("./src/database/config");
const mongoose = require("mongoose");
const bodyParser  = require("body-parser");
const methodOverride  = require("method-override");

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
  }

  routes() {
    this.express.use(require("./routes"));
  }
}

module.exports = new App().express;