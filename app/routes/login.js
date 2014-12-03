var debug = require('debug')('daywrite');
var express = require('express');
var mongoose = require('mongoose');
var passwordHash = require('password-hash');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res) {
  res.render('login.html');
});

/* POST login credentials. */
router.post('/', function(req, res) {
  var User = mongoose.model('User');
  User.findOne({ email : req.body.email }, 'password', function(err,
person){
    if (err) debug(err);
    if (passwordHash.verify(req.body.password, person.password)){
        // TODO: store session vars, redirect to auth_index
        debug("SUCCESS");
    }
    res.render('login.html');
  });
});

module.exports = router;
