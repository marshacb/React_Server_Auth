// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express(); //express instance

//App Setup, get express working


//Server Setup, get express communicating to outside world
const port = process.env.PORT || 3090;
const server = http.createServer(app); //http, native node library
server.listen(port);
console.log("Server listening on:", port);
