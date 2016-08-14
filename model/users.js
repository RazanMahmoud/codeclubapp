var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var usersSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: Number, default: 1 },
  points: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  events: 
    { type: String,
      description: String,
      points: Number,
      date: { type: Date, default: Date.now },
      event_date: {
          day: Number,
          month: Number,
          year: Number
      },
      event_time: String,
      joined: {}


  }

});
var User = module.exports = mongoose.model('User', usersSchema);
module.exports.createUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.password, salt, function(err, hash) {
          newUser.password = hash;
          newUser.save(callback);
      });
  });
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}