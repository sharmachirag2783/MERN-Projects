//Step-1 Fetch token from headers
//Step-2 Check if token exists
//Step-3 Verify token
//Step-4 If verified token proceed next() else throw err
const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = (req, res, next) => {
  //First Step =>Token fetch from headers
  const token = req.header('x-api-key');
  //Second step=>Check if token exists
  if (!token) {
    return res.json({
      statusCode: 404,
      message: 'Token not found Authorization denied',
    });
  }
  //Third step=>Verify token(valid/invalid)
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.json({ statusCode: 401, message: 'Token is not valid!' });
  }
};
