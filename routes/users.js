const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { check, validationResult } = require("express-validator/check");

router.get("/", function(req, res){
  let users = new usersController();
  res.render("users", {judul : "Users Menu"});
});

/*
*
* Save user ke database
*
*/
router.post("/", 
  [
    check("name").isLength({min: 1, max: 20}).withMessage("The name must be 1-20 chars long").matches("[a-zA-Z ]+").withMessage("The name only contains alpahabet").escape(),
    check("department").isLength({min: 1, max:20}).withMessage("The name must be 1-20 chars long").escape(),
    check("location").isLength({min: 1}).withMessage("The name must be 1-20 chars long").escape(),
  ],
  function(req, res){
    let nameForm = req.body.name;
    let departmentForm = req.body.department;
    let locationForm = req.body.location;

    let errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let users = new usersController(0, nameForm, departmentForm, locationForm);
    users.save(req, res);
  }
);

/*
*
* Edit user
*
*/
router.get("/edit/:id", function(req, res){
  getID = req.params.id;
  res.render("users_edit", {judul: "Edit User", id: getID});
});

router.post("/edit/:id",
  [
    check("name").isLength({min: 1, max: 20}).withMessage("The name must be 1-20 chars long").matches("[a-zA-Z ]+").withMessage("The name only contains alpahabet").escape(),
    check("department").isLength({min: 1, max:20}).withMessage("The name must be 1-20 chars long").escape(),
    check("location").isLength({min: 1}).withMessage("The name must be 1-20 chars long").escape(),
  ],
  function(req, res){
    let getID = req.params.id;
    let nameForm = req.body.name;
    let departmentForm = req.body.department;
    let locationForm = req.body.location;

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      let users = new usersController(getID, nameForm, departmentForm, locationForm);
      users.edit(req, res);
    }
  }
);

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

router.get("/search/:find", function(req, res){
  getFind = req.params.find;
  let users = new usersController(0, getFind);
  users.search(req, res);
});

module.exports = router;