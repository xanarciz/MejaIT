const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tasksModel = new Schema({
    date: {type : String},
    description: {type: String},
    remediation: {type: String},
    rootCause: {type: String},
    status: {type: String},
    user: {
        type: Object,
        ref: "users"
    },
    it: {
        type: Object,
        ref: "its"
    }
});

module.exports = mongoose.model("tasks", tasksModel);