const { authMiddleware } = require('../middleware/authMiddleware');
const client = require('../utils/databasepg');
const { findVideos, saveVideo } = require('../controllers/videos');

const videoUpload = require('../utils/videoUpload');

var router = require('express').Router();

const Replicate = require("replicate");
require('dotenv').config();


const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

router.get('/', authMiddleware, async function(req, res) {
  try {
    let videos = await findVideos(req);
    res.status(200).send(videos);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', authMiddleware, async function(req, res) {
  try {
    let entry = await saveVideo(req);
    res.status(200).send({
      message: 'File uploaded and Saved successfully'
    })
  } catch (error) {
    res.status(500).send(error);
  }
});


router.post('/ai', async function(req, res) {
  const output = await replicate.run(
    "openai/whisper:4d50797290df275329f202e48c76360b3f22b08d28c196cbc54600319435f8d2",
    {
      input: {
        audio: "https://replicate.delivery/mgxm/e5159b1b-508a-4be4-b892-e1eb47850bdc/OSR_uk_000_0050_8k.wav",
        model: "large-v3",
        language: "af",
        translate: false,
        temperature: 0,
        transcription: "plain text",
        suppress_tokens: "-1",
        logprob_threshold: -1,
        no_speech_threshold: 0.6,
        condition_on_previous_text: true,
        compression_ratio_threshold: 2.4,
        temperature_increment_on_fallback: 0.2
      }
    }
  );
  res.send(output);
})

module.exports = router;