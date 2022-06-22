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

async function getPostInfoByHashtagName(hashtagName){
  return connection.query(`
    SELECT *
    FROM posts
    WHERE description LIKE $1
  `, ['%#' + hashtagName + '%']);
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

async function postHashtag(hashtag){
  return connection.query(`
    INSERT INTO hashtags(name) 
    VALUES($1);
  `, [hashtag]);
};

async function postHashtagsPosts(hashtagId, postId){
  return connection.query(`
    INSERT INTO "postsHashtags"("hashtagId", "postId") 
    VALUES($1, $2);
  `, [hashtagId, postId]);
};

async function getCommentsCount(postId){
  return connection.query(`
    SELECT COUNT(id)
    FROM comments
    WHERE "postId" = $1;
  `, [postId]);
};

async function getComments(postId){
  return connection.query(`
    SELECT c.*,u.name, u."photoLink"
    FROM comments AS c
    JOIN "users" AS u
    ON u.id = "commenterId"
    WHERE "postId" = $1
    ORDER BY c."createdAt" ASC;
  `, [postId]);
};



const postsRepository = {
  getPostInfoByHashtag,
  postUserUrl,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getUserPosts,
  postHashtag,
  getPostInfoByHashtagName,
  postHashtagsPosts,
  getCommentsCount,
  getComments
};

export default postsRepository;