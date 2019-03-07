const newTask = require('../controllers/task');
const router = require('express').Router();





// const Task = require('../models/task');

// users.route('/user/:id/task/new')
//     .post((req, res) => {
//         const body = req.body;
//         console.log(body);
//         //const task = new Task(body)
//
//
//         controller.newTask(body).then((taskRes) => {
//             res.send(taskRes);
//         }).catch(err => {
//             console.log(err.message);
//         })
//
//     })





router.route('/user/:id/task/new')
    .post((req, res) => {
      // const task = new Task(body)
      task.save().then((taskRes) => {
        res.send(taskRes);
      }).catch((err) => {
        console.log(err.message);
      });
    });

module.exports = router;
