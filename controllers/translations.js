
const client = require('../utils/databasepg');
const storage = require('firebase/storage');

const Replicate = require("replicate");
require('dotenv').config();


const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

exports.getTranslation = async (req) => {
  try {
    let query = await client.query('select * from translations where (video_id = $1) and (user_id = $2)', [ req.query['video_id'], req.user.id] );
    return query.rows || [];
  } catch (error) {
    throw new Error(error);
  }
};

exports.generateTranslation = async (req) => {
  try {
    let translations = null;
    let video = null;

    {
      let query = await client.query('select * from translations where (video_id = $1) and (user_id = $2) and (language = $3)', [ req.body.video_id, req.user.id, req.body.language] );
      if(query.rows.length > 0) {
        return query.rows || [];
      }
    }

    {
      let query = await client.query('select * from videos where (video_id = $1) and (user_id = $2)', [ req.body.video_id, req.user.id ] );
      if(query.rows.length >= 0) {
        video = query.rows[0];
      }
    }

    if(!video) throw new Error('Video not found');

    const output = await replicate.run(
      "cjwbw/seamless_communication:668a4fec05a887143e5fe8d45df25ec4c794dd43169b9a11562309b2d45873b0",
      {
        input: {
          task_name: "S2ST (Speech to Speech translation)",
          input_audio: video.filepath,
          input_text_language: "None",
          max_input_audio_length: 60,
          target_language_text_only: "Norwegian Nynorsk",
          target_language_with_speech: req.body.language
        }
      }
    );

    if(output && output.error) throw new Error(output.error);

    {
      let audio_output = await fetch(output.audio_output)
      let audio_output_blob = await audio_output.blob()
      const storageRef = storage.ref(storage.getStorage(), `users/${req.user.id}/${(Math.floor(Math.random() * 19999) + 10000) + '-'}${output.audio_output.match(/\/([^\/]+)\/?$/)[1]}`);
      await storage.uploadBytes(storageRef, audio_output_blob)
      let downloadURL = await storage.getDownloadURL(storageRef);
      let query = await client.query('insert into translations (video_id, user_id, language, textoutput, audiooutput) values ($1, $2, $3, $4, $5)', [ req.body.video_id, req.user.id, req.body.language, output.text_output, downloadURL] );
    }

    {
      let query = await client.query('select * from translations where (video_id = $1) and (user_id = $2)', [ req.body.video_id, req.user.id] );
      if(query.rows.length > 0) {
        return query.rows || [];
      }
    }

  } catch (error) {
    throw new Error(error);
  }
};