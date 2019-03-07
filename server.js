require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const expressValidator = require('express-validator')// disables user to not write scripts
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan'); // for logging in terminal
const db = require('./database/taskmanager-db');// database connection

// tell app to use npm packages
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(expressValidator());
// app.use(express.urlencoded({ extended: false }));



// routes
// const userRouter = require('./routers/user');
// const taskRouter = require('./routers/task');
const auth = require('./controllers/user');
const task = require('./controllers/task');

app.use(auth);
app.use(task);

// app.use(taskRouter);



const port = process.env.PORT || 3000; //for heroku to listen
app.listen(port);



module.exports = app
