const Task = require('../models/task');
const User = require('../models/user');
const router = require('express').Router();
const checkAuth = require('../middleware/checkAuth');

// creates a new task
router.post('/user/:id/task/new', checkAuth, (req, res) => {
  console.log('here in task route');
  const task = new Task(req.body);
  console.log("task:", task);
  task.save().then((task) => {
    // return User.findById(req.user._id);
    // }).then((user) => {
    console.log('req.user:', req.user);
    req.user.tasks.unshift(task);
    req.user.save();
    return res.status(200)
        .send({message: 'Successfully added task'});
  }).catch(console.err);
  // }).catch((err) => {
  //   console.log(err.message);
  // });
  // if (req.user) {
  //
  // } else {
  //   return res.status(401);
  // }
});


// show a task
router.get('/user/:id/task/:id', (req, res) => {
  Task.findById(req.params.id).then((task) => {
    return res.status(200).send(task);
  }).catch((err) => {
    console.log('here comews the error');
    console.log(err.message);
  });
});

//
// // show task
// router.get('/user/:id/task/:id', (req, res) => {
//   const currentUser = req.user;
//
//   Task.findById(req.params.id);
// });
//
//
// // user updates a task
// router.put()

module.exports = router;
