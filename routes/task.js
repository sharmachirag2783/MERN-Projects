const taskController = require('../controllers/taskcontroller');
const auth = require('../middleware/auth');
const router = require('express').Router();

//@GET route
//@DESC Get all routes of logged in user
router.get('/all', auth, taskController.getAllTasks);

//@POST route
//@DESC Create Task by logged in user
router.post('/create-task', auth, taskController.createTask);

//@PUT Route
//@DESC Update Task
router.put('/update-task/:id', auth, taskController.updateTask);
//@DELETE Route
//@DESC Delete Task
router.delete('/delete-task/:id', auth, taskController.deleteTask);

module.exports = router;
