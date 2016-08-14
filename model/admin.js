var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var adminSchema = mongoose.Schema({
	username: String,
  email: String,
  password: String,

});

var admin = module.exports = mongoose.model('admin', adminSchema);