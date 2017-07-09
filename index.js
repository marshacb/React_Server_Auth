// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express(); //express instance

//install nodemon, watched file for changes and auto reloads



//App Setup, get express working
//all incoming requests will pass through morgan and body-parser, app.use registers as middleware
app.use(morgan('combined')); //middleware, morgan- debuggin/logging framework
app.use(bodyParser.json({type: '*/*'})); //middleware, body-parser, parses incoming requests into json regardless of type





//Server Setup, get express communicating to outside world
const port = process.env.PORT || 3090;
const server = http.createServer(app); //http, native node library
server.listen(port);
console.log("Server listening on:", port);
