const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
});

module.exports = User = mongoose.model('User', UserSchema);
//TYPES OF SERVERS
//Monolith=>Ek server ki multiple services=>Multiple Routes
//TODO=> USER ROUTE AUTH ROUTE TASK ROUTE
//USER=>Get logged in user,login and sign up
//TASK=>Get specific task, get all task, create/update/delete task.
//Monolith i.e. One server one service includes multiple routes
//CHOTA PROJECT

//Microservices=>LOVELY CONCEPT
//One server but multiple services.
//USER service and Task service
//EK BUS (Docker Container/Kubernetes Container)=>Main Container=>SERVER
//Big/large scale projects
//Netflix / Instagram etc
//Node/Python/Ruby on Rails
//Domain xyz.com multiple sub-domains bna lete hain abcxyz.com==>subdomain.xyz main domain
