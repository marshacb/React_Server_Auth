const Authentication = require('./controllers/authentication');
module.exports = function(app) {
// app.get('/', function(req, res, next) {
//   // next is for error handling
//   res.send(['waterbottle', 'phone', 'paper']);
// });

app.post('/signup', Authentication.signup);


}
