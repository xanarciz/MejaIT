const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/", function(req, res){
  let users = new usersController();
  res.render("users", {judul : "Users Menu"});
});

router.post("/", function(req, res){
  let nameForm = req.body.name;
  let departmentForm = req.body.department;
  let locationForm = req.body.location;

  let users = new usersController(0, nameForm, departmentForm, locationForm);
  users.save(req, res);
});

router.get("/edit/:id", function(req, res){

});

router.get("/delete/:id", function(req, res){
  getID = req.params.id;
  let users = new usersController(getID);
  users.delete(req, res);
});

router.get("/get", function(req, res){
  let users = new usersController(0);
  users.view(req, res);
});

router.get("/get/:id", function(req, res){
  getID = req.params.id;
  let users = new usersController(getID);
  users.view(req, res);
});

module.exports = router;