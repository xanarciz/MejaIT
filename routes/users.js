const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const users = new usersController();

router.get("/", function(req, res){
  res.render("users", {judul : "Users Menu"});
});

router.post("/", function(req, res){
  res.redirect("/users");
});

router.get("/get", function(req, res){
  users.view(req, res);
});

router.get("/get/:id", function(req, res){
  users.view(req, res, req.params.id);
});

module.exports = router;
