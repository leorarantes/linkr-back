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
};

async function updateHashtag(hashtag){
  return connection.query(`
    UPDATE hashtags 
    SET "useCount" = "useCount" + 1
    WHERE name = $1;
    `, [hashtag]);
}

const hashtagRepository = {
  getHashtagInfo,
  getTrendingHashtags,
  updateHashtag
};

export default hashtagRepository;