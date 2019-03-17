const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const app = express();
const mongoose = require("mongoose");

app.set("view engine", "pug");
app.locals.pretty = true;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());

const mongoDB = "mongodb://localhost/db_mejait";
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

// Routes
let dashboardRouter = require("./routes/dashboard");
let usersRoutes = require("./routes/users");
let itsRoutes = require("./routes/its");
let tasksRouter = require("./routes/tasks"); 

app.use("/", dashboardRouter);
app.use("/dashboard", dashboardRouter);
app.use("/users", usersRoutes);
app.use("/its", itsRoutes);
app.use("/tasks", tasksRouter);

let port = 1999;
app.listen(port);