const mongoose = require('mongoose');
const assert = require('assert');

const url = process.env.MONGODB_URI || 'mongodb://localhost/taskmanager-db';
mongoose.Promise = global.Promise;

mongoose.connect(
    url,
    // mongoose connection options
    {userNewUrlParser: true},
    function(err, db) {
      assert.equal(null, err);
      console.log('Connect to database');
      // `db.close` turn on for testing
    }
);

mongoose.connection.on('error',
    console.error.bind(console, 'MongoDB connection error:'));
mongoose.set('debug', true);

module.exports = mongoose.connection;
