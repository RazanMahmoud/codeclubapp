var mongoose = require('mongoose')
,Schema = mongoose.Schema ;
var bcrypt = require('bcryptjs');

var usersSchema = Schema({
  username: String,
  email: String,
  password: String,
  role: { type: Number, default: 1 },
  points: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }]

});

var eventSchema = Schema({
  name: String,
      description: String,
      points: Number,
      date: { type: Date, default: Date.now },
      event_date: String,
      event_time: String,
      joined: {}

})
var User = module.exports = mongoose.model('User', usersSchema);
var Event = module.exports = mongoose.model('Event', eventSchema);

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

module.exports.createEvent = function(newEvent, callback){
  newEvent.save(callback);
}