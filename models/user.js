const mongoose = require('mongoose');
const Schema = mongoose.Schema; //what we use to tell mongoose about fields we will have

// Define our model
const userSchema = new Schema({
  // before its saved to the database, it checks that email is unique
  email: { type: String, unique: true, lowercase: true }, //enforce uniqueness, not case sensitive
  password: String
})

// Create the model class
const ModelClass = mongoose.model('user', userSchema); // loads the schema into mongoose, corresponds to collection named user


// Export the model
module.exports = ModelClass;
