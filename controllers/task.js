const Task = require('../models/task');
const router = require('express').router();


//
// function newTask(body) {
//     const task = new Task({body});
//     console.log(task);
//     task.save();
// }


const newTask = (req, res) => {
  let task = new Task();
  task = req.body;
  task.save()
      .then((taskRes) => {
        res.status(200).send(taskRes);
      }).catch((error) => {
        console.log(error);
      });
};

module.exports = {newTask};
