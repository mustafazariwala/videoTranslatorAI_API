// Import Router from express
var router = require('express').Router();
const { userLoginRequest, testRequest } = require('../controllers/users');
// Importing Moment to send time of the request
const moment = require('moment');

router.post('/login', async (req, res) => {
  try {
    let user = await userLoginRequest(req);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({message: error.message});
  }
})

module.exports = router;
