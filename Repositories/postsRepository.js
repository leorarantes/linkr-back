import connection from "../config/db.js";

async function getPostInfoByHashtag(hashtagId){
  return connection.query(`
    SELECT posts.*
    FROM posts
    JOIN "postsHashtags" as ph
    ON ph."postId" = posts.id
    WHERE ph."hashtagId" = $1
    ORDER BY posts."createdAt" DESC;
  `, [hashtagId])
};

async function getPostInfoByHashtagName(hashtagName){
  return connection.query(`
    SELECT *
    FROM posts
    WHERE description LIKE $1
  `, ['%#' + hashtagName + '%']);
};

async function getAllPosts(userId){
  return connection.query(`
    SELECT DISTINCT ON (p.id) u.name AS username, u."photoLink", p.*, f.*
    FROM users AS u
    JOIN posts AS p
    ON u.id = p."userId"
    JOIN follows AS f
    ON p."userId" = f."followedId"
    WHERE f."followerId" = $1 OR p."userId" = $1
    ORDER BY p.id  desc
    LIMIT 20
  `, [userId])
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
    WHERE "userId" = $1
    ORDER BY "createdAt" DESC;;
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
    SELECT c.*,u.name, u."photoLink", f."followerId", f."followedId"
    FROM comments AS c
    JOIN "users" AS u
    ON u.id = "commenterId"
    LEFT JOIN "follows" AS f
    ON f."followerId" = c."commenterId" AND f."followedId" = c."authorId"
    WHERE "postId" = $1
    ORDER BY c."createdAt" ASC;
  `, [postId]);
};

async function getNewPosts(postId){
  return connection.query(`
    SELECT COUNT(*) FROM posts
    WHERE id > $1;
  `, [postId]);
}

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
  getComments,
  getNewPosts
};

export default postsRepository;