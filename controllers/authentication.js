const User = require('../models/user');

exports.signup = function(req, res, next) {
//  res.send({success: true});
//console.log(req.body);
const email = req.body.email;
const password = req.body.password;

// See if a user with the given email exists
// search through every db record and see if email exists

User.findOne({ email: email }, function(err, existingUser) {
  if(err)  { return next(err); }

// If a user with email does exits, return an Error
  if(existingUser) {
    // unprocessable entity
    return res.status(422).send( { error: 'Email is in use'});
  }

  // If a user with email does NOT exist, create and save user record
  const user = new User({
    email: email,
    password: password
  });

  user.save(function(err) {
    if(err) { return next(err); }

    // Respond to request indicating the user was created
    res.json({ success: true });
    });
  });
}
