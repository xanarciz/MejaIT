const express = require("express");
const usersModel = require("../models/usersModel");

class usersController {
  save(req, res){

  }
  edit(req, res){

  }
  delete(req, res){

  }
  view(req, res, id = 0){
    var find = id == 0 ? {} : {_id: id};
    usersModel.find(find, (err, users) => {
      res.json(users);
    });
  }
}

module.exports = usersController;
