import connection from "../config/db.js";

async function getHashtagInfo(hashtag){
  return connection.query(`
    SELECT *
    FROM hashtags
    WHERE name = $1;
  `, [hashtag])
};

async function getTrendingHashtags(){
  return connection.query(`
  SELECT name 
  FROM hashtags
  ORDER BY "useCount" DESC
  LIMIT 10;
  `)
}

const hashtagRepository = {
  getHashtagInfo,
  getTrendingHashtags
};

export default hashtagRepository;