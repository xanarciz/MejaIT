var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const itsModel = new Schema({
    name: {type: String},
    position: {type: String}
});

module.exports = mongoose.model('its', itsModel);