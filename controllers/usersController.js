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
    usersModel.updateOne({_id: this.id}, {name: this.name, department: this.department, location: this.location}, (err) => {
      if (err) return handleError(err);
      res.redirect(usersRouter);
    });
  }

  delete(req, res){
    usersModel.deleteOne({_id: this.id}, (err) => {
      if (err) return handleError(err);
      res.redirect(usersRouter);
    });
  }

  view(req, res){
    let find = this.id == 0 ? {} : {_id: this.id};
    usersModel.find(find, (err, users) => {
      res.json(users);
    }).sort({department:"asc"});
  }
  
  search(req, res){
    let find = {'name': new RegExp(this.name)};
    usersModel.find(find, (err, users) => {
      res.json(users);
    }).sort({department:"asc"});
  }

}

module.exports = usersController;