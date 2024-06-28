var router = require('express').Router();
const { getTranslation, generateTranslation } = require('../controllers/translations');
const moment = require('moment');
const { authMiddleware } = require('../middleware/authMiddleware');


router.post('/', authMiddleware, async (req, res) => {
  try {
    let result = await generateTranslation(req);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({message: error.message});
  }
})


router.get('/', authMiddleware, async function(req, res) {
  try {
    let result = await getTranslation(req);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({message: error.message});
  }
});

module.exports = router;
