const mongoose = require('mongoose');
const Schema = mongoose.Schema; //what we use to tell mongoose about fields we will have
const bcrypt = require('bcrypt-nodejs');
// Define our model
const userSchema = new Schema({
  // before its saved to the database, it checks that email is unique
  email: { type: String, unique: true, lowercase: true }, //enforce uniqueness, not case sensitive
  password: String
});

// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next) {

  // get access to the user model
  const user = this;

// generate a salt, then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if(err) { return next(err); }

    // hash(encrypt)  our password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) { return next(err); }

      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  // this is a reference to the user model
  // bcrypt is taking the salt, hashing the incoming password and doing the comparison with the saved hashed password
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) { return callback(err); }

    callback(null, isMatch);
  });
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema); // loads the schema into mongoose, corresponds to collection named user


// Export the model
module.exports = ModelClass;
