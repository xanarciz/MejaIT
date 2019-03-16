const itsModel = require("../models/itsModel");
const itsRouter = "/its";
const { check, validationResult } = require('express-validator/check');

class itsController {

  constructor(id, name, position){
    this.id = id;
    this.name = name;
    this.position = position;
  }

  save(req, res){
    itsModel.create(
      {
        name: this.name,
        position: this.position
      },
      (err) => {
        if (err) return handleError(err);
        res.redirect(itsRouter);
      }
    );
  }

  edit(req, res){
    itsModel.updateOne(
      {
        _id: this.id
      }, 
      {
        name: this.name,
        position: this.position
      }, 
      (err) => {
        if (err) return handleError(err);
        res.redirect(itsRouter);
      }
    );
  }

  delete(req, res){
    itsModel.deleteOne(
      {
        _id: this.id
      },
      (err) => {
        if (err) return handleError(err);
        res.redirect(itsRouter);
      }
    );
  }

  view(req, res){
    var find = this.id == 0 ? {} : {_id: this.id};
    itsModel.find(find, (err, users) => {
      res.json(users);
    }).sort({department:"asc"});
  }
}

module.exports = itsController;