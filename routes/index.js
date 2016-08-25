var express = require('express');
var router = express.Router();
var session = require('express-session');
var Event = require('../model/users');
var User = require('../model/users');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){

	//res.write('<h1>Hello '+  ".." +'</h1>');

 res.render('index');
});
//events
router.get('/newevent', ensureAuthenticated, function(req, res){
res.render('events/newevent');
});
router.post('/newevent', function(req, res){
	var name = req.body.name;
	var description = req.body.description;
	var points = req.body.points;
	var date = req.body.date;
	var time = req.body.time;
	// Validation
	req.checkBody('name', 'event name is required').notEmpty();
	req.checkBody('description', ' Event description is required').notEmpty();
	req.checkBody('points', 'event points is required').notEmpty();
	req.checkBody('date', 'event date is required').notEmpty();
	req.checkBody('time', 'event time is required').notEmpty();
	var errors = req.validationErrors();
	if(errors){
		res.render('newevent',{
			errors:errors
		});
	} else {
		var newEvent = new Event({
			name: name,
	      description: description,
	      points: points,
	      event_date: date,
	      event_time: time,
		});

		Event.createEvent(newEvent, function(err, event){
			if(err) throw err;
			console.log(event);
		});

		req.flash('success_msg', 'Event created successfully :P');

		res.redirect('/');
	}

});

//admin page
/*router.get('/admin', function(req, res, next) {
  res.render('admin/adminlogin');
});*/

/*router.get('/admin/register', function(req, res, next) {
  res.render('admin/adminlogin');
});

router.post('/admin/register', function(req, res){
res.redirect('/admin/register');
});*/

//profile 
router.get('/profile', ensureAuthenticated, function(req, res){
res.render('profile/profile');
});
router.post('/profile', function(req, res){
res.redirect('/users/profile');
});


function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('error_msg','You are not logged in');
    res.redirect('/users/login');
  }
}


module.exports = router;