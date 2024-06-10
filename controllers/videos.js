const client = require('../utils/databasepg');

exports.findVideos = async (req) => {
  try {
    let query = await client.query('select * from videos where user_id = $1', [req.user.id]);
    return query.rows || [];
  } catch (error) {
    throw new Error(error);
  }
};



exports.uploadVideo = async (req) => {
  try {
    let entry = await client.query('insert into videos (filename, filepath, user_id) values ($1, $2, $3)', [req.file.originalname, req.file.path, req.user.id]);
    if (entry.rowCount > 0) {
      return entry.rows;
    } else {
      throw new Error('Video not uploaded');
    }
  } catch (error) {
    throw new Error(error);
  }
  
}