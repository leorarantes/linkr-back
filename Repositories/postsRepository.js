import connection from "../config/db.js";

async function getPostInfoByHashtag(hashtagId){
  return connection.query(`
  SELECT posts.*
  FROM posts
  JOIN "postsHashtags" as ph
  ON ph."postId" = posts.id
  WHERE ph."hashtagId" = $1;
  `, [hashtagId])
};

const postsRepository = {
  getPostInfoByHashtag
};

export default postsRepository;