require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const expressValidator = require('express-validator')// disables user to not write scripts
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan'); // for logging in terminal

// tell app to use npm packages
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(expressValidator());
app.use(express.urlencoded({ extended: false }));
require('./database/apiprojectdatabase');// database connection



// routes
const userRouter = require('./routers/user');
app.use(userRouter);



const port = process.env.PORT || 3000; //for heroku to listen
app.listen(port);



module.exports = app;
