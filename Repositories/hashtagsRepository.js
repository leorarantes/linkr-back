import connection from "../config/db.js";

async function getHashtagInfo(hashtag){
  return connection.query(`
    SELECT *
    FROM hashtags
    WHERE name = $1;
  `, [hashtag])
};

const hashtagRepository = {
  getHashtagInfo
};

export default hashtagRepository;