const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");
const {check} = require("express-validator/check");

router.get("/", function(req, res){
	res.render("task", {judul: "Task Menu"});
});

router.post("/",
	[
		check("description").escape(),
		check("remediation").escape(),
		check("rootCause").escape(),
		check("status").escape()
	],
	function(req, res){
		let dateForm = req.body.date;
		let userForm = req.body.user;
		let descriptionForm = req.body.description;
		let remediationForm = req.body.remediation;
		let rootCauseForm = req.body.rootcause;
		let statusForm = req.body.status;
		let supportForm = req.body.support;
		let tasks = new tasksController("", dateForm, userForm, descriptionForm, remediationForm, rootCauseForm, statusForm, supportForm);
		tasks.save(req, res);
	}
);

router.get("/get", function(req, res){
	let tasks = new tasksController();
	tasks.view(req, res);
});

router.get("/get/:id", function(req, res){
	let tasks = new tasksController(req.params.id);
	tasks.view(req, res);
});

router.get("/edit/:id", function(req, res){
	res.render("tasks_edit", {judul: "Edit Task", id: req.params.id});
});

router.post("/edit/:id", 
	[
		check("description").escape(),
		check("remediation").escape(),
		check("rootCause").escape(),
		check("status").escape()
	],
	function(req, res){
		let getID = req.params.id;
		let dateForm = req.body.date;
		let userForm = req.body.user;
		let descriptionForm = req.body.description;
		let remediationForm = req.body.remediation;
		let rootCauseForm = req.body.rootcause;
		let statusForm = req.body.status;
		let supportForm = req.body.support;
		let tasks = new tasksController(getID, dateForm, userForm, descriptionForm, remediationForm, rootCauseForm, statusForm, supportForm);
		tasks.edit(req, res);
	}
);

router.get("/delete/:id", function(req, res){
	let tasks = new tasksController(req.params.id);
	tasks.delete(req, res);
});

// router.get("/report", function(req, res){
	
// });

module.exports = router;