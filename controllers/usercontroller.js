//@POST route
//@DESC User Signup/User creation
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //Check if user already exists
    var user = await User.findOne({ email });
    if (user) {
      return res.json({ statusCode: 400, message: 'User already exists' });
    }

    //Create new user
    user = new User({ name, email, password });
    //Password Hashing
    //Step-1 of password hashing=>Salt Generation
    const salt = await bcrypt.genSalt(10);
    //Step-2 of password hashing=>Modifying the DB password
    user.password = await bcrypt.hash(password, salt);
    //Save user to DB
    await user.save();
    //Token generation
    //Step-1 creation of payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    //Step-2 Token generation
    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: 3600000000 },
      (err, token) => {
        if (err) throw err;
        //Send response to client

        return res.json({
          statusCode: 200,
          message: 'User Registered',
          user: user,
          token: token,
        });
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    var user = await User.findOne({ email });
    if (user) {
      const validpw = await bcrypt.compare(password, user.password);
      if (validpw) {
        const payload = {
          user: {
            id: user.id,
          },
        };
        jwt.sign(
          payload,
          process.env.jwtSecret,
          { expiresIn: 3600000000 },
          (err, token) => {
            if (err) throw err;
            //Send response to client

            return res.json({
              statusCode: 200,
              message: 'Logged in',
              user: user,
              token: token,
            });
          }
        );
      } else {
        res.json({ statusCode: 400, message: 'Incorrect credentials' });
      }
    } else {
      res.json({ statusCode: 400, message: 'Incorrect credentials' });
    }
  } catch (error) {
    console.log(error.message);
  }
};
//About working of JWT
//JWT Token-JsonWebToken=>Secret Token (Collection of strings=150 approx random characters)
//Primary Key=>ID
//Token=>ID hidden
//Token=>USER A=>USER B can't access this token
//Expiry=>Custom
//Sessions
//Token=>Chirag=>jdsnfaikvjansidkjcnf
//GET my tasks=>Token=>User specific tasks fetch kar sakte hain
//middleware =>auth.js=>token decoding=>userID=>specific tasks sirf apne fetch kr skte hain
//Token generation secret key is required
//Token A => Secret Key A=>Secret Key A can decode it not Secret Key B
