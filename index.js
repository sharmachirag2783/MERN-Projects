const express = require('express');
const connectDB = require('./config/db');
const app = express();
//Code Architectures:-
//Monolith=>
//MVC=>Model View Controller
//MicroServices-Based

//Database connectivity
connectDB();
//domain.com// on Local=>localhost:5000/api/test
app.use(require('cors')());

app.use(express.json({ extended: true }));
app.use('/api/user', require('./routes/user'));
app.use('/api/task', require('./routes/task'));
//If route is missing
app.get('*', (req, res) => {
  res.json({ statusCode: 404, message: 'Route not found' });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server connected on PORT: ', PORT);
});
//mongoose->MongoDB
//jsonwebtoken->Secret Token=>Authorized Token
//Bcryptjs->Password encryption=>SHA-16
///dotenv->environment variables file
//mongoDB setup
//Models setup
//Tasks for tomorrow
//routes for tasks
