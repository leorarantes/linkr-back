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

async function getAllPosts(){
  return connection.query(`
      SELECT p.*, u.name AS username, u."photoLink" 
      FROM posts p
      JOIN users u 
        ON p."userId" = u.id
      ORDER BY "createdAt" DESC
      LIMIT 20
    `)
};

async function postUserUrl(values){
  return connection.query(`
    INSERT INTO posts(link, description, "userId") VALUES ($1, $2, $3);
  `, values);
}

const postsRepository = {
  getPostInfoByHashtag,
  postUserUrl,
  getAllPosts
};

export default postsRepository;