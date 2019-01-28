const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

app.set('view engine', 'pug');
app.locals.pretty = true;
app.use(express.static('public'));

var mongoDB = "mongodb://localhost/db_mejait";
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Routes
var usersRoutes = require("./routes/users");

app.use("/users", usersRoutes);

app.listen(1999, () =>{
  console.log("berjalan di port 1999");
});