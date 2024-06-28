// Import Router from express
var router = require('express').Router();

// Router to use routes from the users.js file in the routes folder
router.use('/users', require('./users'));

router.use('/videos', require('./videos'));

router.use('/translations', require('./translations'));
// Exporting router to be used in the server.js file
module.exports = router;




