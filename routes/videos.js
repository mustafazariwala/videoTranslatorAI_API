const { authMiddleware } = require('../middleware/authMiddleware');
const client = require('../utils/databasepg');
const { findVideos, uploadVideo } = require('../controllers/videos');

const videoUpload = require('../utils/videoUpload');

var router = require('express').Router();

router.get('/', authMiddleware, async function(req, res) {
  try {
    let videos = await findVideos(req);
    res.status(200).send(videos);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', authMiddleware, videoUpload.single('file'), async function(req, res) {
  try {
    let entry = await uploadVideo(req);
    res.status(200).send({
      message: 'File uploaded and Saved successfully'
    })
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;