const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// interceptor, for any very particular route
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(app) {
// app.get('/', function(req, res, next) {
//   // next is for error handling
//   res.send(['waterbottle', 'phone', 'paper']);
// });

app.get('/', requireAuth, function(req, res) {
  res.send({ hi: 'there'});
})

app.post('/signup', Authentication.signup);


}
