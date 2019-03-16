const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator/check");
const itsController = require("../controllers/itsController");

router.get("/", function(req, res){
  res.render("its", {judul : "ITs Menu"});
});

router.post("/", 
  [
    check("name").isLength({min: 1, max: 20}).withMessage("The name must be 1-20 chars long").matches("[a-zA-Z ]+").withMessage("The name only contains alpahabet").escape(),
    check("position").isLength({min: 1, max: 20}).withMessage("The location must be 1-20 chars long").escape()
  ],
  function (req, res){
    let nameForm = req.body.name;
    let positionForm = req.body.position;
    let errors = validationResult(req);

    if(!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() });
    }

    let its = new itsController(0, nameForm, positionForm);
    its.save(req, res);
  }
);

router.get("/edit/:id", function(req, res){
  let getID = req.params.id;
  res.render("its_edit", {judul: "Edit IT", id: getID});
});

router.post("/edit/:id", 
  [
    check("name").isLength({min: 1, max: 20}).withMessage("The name must be 1-20 chars long").matches("[a-zA-Z ]+").withMessage("The name only contains alpahabet").escape(),
    check("position").isLength({min: 1, max: 20}).withMessage("The position must be 1-20 chars long").escape(),
  ],
  function(req, res){
    let getID = req.params.id;
    let nameForm = req.body.name;
    let positionForm = req.body.position;

    let errors = validationResult(req);

    if (!errors.isEmpty()){
      res.status(422).json({errors : errors.array()});
    } else {
      let its = new itsController(getID, nameForm, positionForm);
      its.edit(req, res);
    }
  }
);

router.get("/delete/:id", function(req, res){
  getID = req.params.id;
  let its = new itsController(getID);
  its.delete(req, res);
});

router.get("/get", function(req, res){
  let its = new itsController(0);
  its.view(req, res);
});

router.get("/get/:id", function(req, res){
  let getID = req.params.id;
  let its = new itsController(getID);
  its.view(req, res);
})

module.exports = router;