const tasksModel = require("../models/tasksModel");
const tasksRouter = "/tasks";
const mongoose = require("mongoose");

class tasksController {

    constructor(id, date, user, description, remediation, rootCause, status, support){
        this.id = id;
        this.date = date;
        this.user = user;
        this.description = description;
        this.remediation = remediation;
        this.rootCause = rootCause;
        this.status = status;
        this.support = support;
    }

    save(req, res){
        tasksModel.create(
            {
                date: this.date,
                description: this.description,
                remediation: this.remediation,
                rootCause: this.rootCause,
                status: this.status,
                user: mongoose.Types.ObjectId(this.user),
                it: mongoose.Types.ObjectId(this.support)
            },
            (err) => {
                if (err) return handleError(err);
                res.redirect(tasksRouter);
            }
        );
    }

    edit(req, res){
        tasksModel.updateOne(
            {
                _id: this.id
            },
            {
                date: this.date,
                description: this.description,
                remediation: this.remediation,
                rootCause: this.rootCause,
                status: this.status,
                user: mongoose.Types.ObjectId(this.user),
                it: mongoose.Types.ObjectId(this.support)
            }, (err) => {
                if (err) return handleError(err);
                res.redirect(tasksRouter);
            }
        );
    }

    delete(req, res){
        tasksModel.deleteOne({_id: this.id}, (err) => {
        if (err) return handleError(err);
            res.redirect(tasksRouter);
        });
    }

    view(req, res){
        let date = !req.query.date ? "" : req.query.date;
        let query = {
            date: new RegExp(date)
        };
        if (this.id !== undefined){
            query["_id"] = this.id;
        }
        tasksModel.find(query)
        .populate("user")
        .populate("it")
        .sort({date: "asc"})
        .exec(function(err, users){
            res.json(users);
        });
    }

}

module.exports = tasksController;