//@GET route
//@DESC Get all taskss of logged in user

const Task = require('../models/Task');
exports.getAllTasks = async (req, res) => {
  try {
    //Find method of Mongoose model returns an array
    //Task a =userID(1234)
    //Task b=userID(5678)
    //User A=ID=>1234
    //This function will  return only "Task a" to user A

    const tasks = await Task.find({ userID: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.log(error.message);
  }
};

//@POST route
//@DESC Create Task
exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    var taskObj = {
      title: title,
      description: description,
      userID: req.user.id,
    };
    //Create Task
    var task = new Task(taskObj);
    //Save task to DB
    await task.save();
    res.json({ statusCode: 200, message: 'Task created', data: task });
  } catch (error) {
    console.log(error.message);
  }
};
//@PUT Route
//Desc Update Task
exports.updateTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    var Obj = {
      title: title,
      description: description,
    };
    var task = await Task.findById(req.params.id);
    if (task) {
      var task = await Task.findOneAndUpdate({
        $set: Obj,
        new: true,
      });
      return res.json({ msg: 'Task Updated', task: task });
    }
    return res.json({ msg: 'Enter valid ID!' });
  } catch (error) {
    console.log(error.message);
  }
};
//@DELETE route
//Delete task
exports.deleteTask = async (req, res) => {
  try {
    var task = await Task.findById(req.params.id);
    if (task) {
      var task = await Task.findOneAndDelete({
        _id: req.params.id,
      });
      return res.json({ message: 'Task Deleted' });
    }
    return res.json({ message: 'Enter valid ID!' });
  } catch (error) {
    console.log(error.message);
  }
};
