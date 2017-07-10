const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy
// when you want to get access to the username, use the email field
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
// Verify this username and password, call done with the user
// if it is the correct email and password
// otherwise, call done with false
User.findOne({ email: email }, function(err, user) {
  if(err) { return done(err); }

  if(!user) { return done(null, false); }

  // compare passwords - is `password` equal to user.password?
  user.comparePassword(password, function(err, isMatch) {
    if(err) { return done(err); }

    // no we didnt find a user
    if(!isMatch) { return done(null, false); }

    // yes, passwords match, return the user, passport assigns to req.user
    return done(null, user);
  })
})
});
// A strategy is a method for authenticating a user

// Setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT strategy
// payload is the decoded jwt token
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that user
  // otherwise, call done without a user object
  User.findById(payload.sub, function(err, user) {
    if(err) { return done(err, false); }

    if(user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
