'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
    name: String, //Así se define en mongoose los Json
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String
});

module.exports = mongoose.model('Project', ProjectSchema);