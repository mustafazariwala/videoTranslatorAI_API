
// Date Time Parser 
const moment = require('moment');
const client = require('../utils/databasepg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Function to send the response for the USER request
exports.userLoginRequest = async (req) => {
  try {
    const { email, password } = req.body;
    let user = (await client.query(`SELECT * FROM users WHERE email = '${email}'`)).rows[0];
    if (!user) {
      throw new Error('User not found');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch) {
      throw new Error('Invalid Password');
    }
    const token = jwt.sign({ email: user.email, id: user.user_id}, 'secret-key', { expiresIn: '1h' });
    return {
      message: 'User Login Successful',
      token: token,
      user: user
    }
  } catch (error) {
    throw new Error(error);
  }
}

exports.testRequest = async (req) => {
  return hash = await bcrypt.hash(req.body.password, 10);
}