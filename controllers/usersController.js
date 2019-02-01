const express = require("express");
const bodyParser = require("body-parser");
const usersModel = require("../models/usersModel");
const usersRouter = "/users";

class usersController {

  constructor(id, name, department, location){
    this.id = id;
    this.name = name;
    this.department = department;
    this.location = location;
  }

  save(req, res){
    usersModel.create({name: this.name, department: this.department, location: this.location}, (err) => {
      if (err) return handleError(err);
      res.redirect(usersRouter);
    });
  }

  edit(req, res){
    
  }

  delete(req, res){
    usersModel.remove({_id: this.id}, (err) => {
      if (err) return handleError(err);
      res.redirect(usersRouter);
    });
  }

  view(req, res){
    var find = this.id == 0 ? {} : {_id: this.id};
    usersModel.find(find, (err, users) => {
      res.json(users);
    });
  }
}

module.exports = usersController;