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

async function getPostById(userId, postId){
  return connection.query(`
    SELECT *
    FROM posts
    WHERE "userId" = $1 AND id = $2;
  `, [userId, postId]);
};

async function updatePost(postId, description){
  return connection.query(`
    UPDATE posts
    SET description = $1
    WHERE id = $2;
  `, [description, postId]);
};

async function deletePost(postId) {
  await connection.query(`
    DELETE
    FROM likes
    WHERE "postId" = $1;
  `, [postId]);

  await connection.query(`
    DELETE
    FROM "postsHashtags"
    WHERE "postId" = $1;
  `, [postId]);

  return connection.query(`
    DELETE
    FROM posts
    WHERE id = $1;
  `, [postId]);
};

async function getUserPosts(userId){
  return connection.query(`
    SELECT * FROM posts
    WHERE "userId" = $1;
  `, [userId]);
}

const postsRepository = {
  getPostInfoByHashtag,
  postUserUrl,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getUserPosts
};

export default postsRepository;