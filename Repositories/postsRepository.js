import connection from "../config/db.js";

async function getPostInfoByHashtag(hashtagId){
  return connection.query(`
    SELECT posts.*, u.name, u."photoLink"
    FROM posts
    JOIN "postsHashtags" as ph
    ON ph."postId" = posts.id
    JOIN users AS u
    ON posts."userId" = u.id
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
    SELECT DISTINCT ON (p.id) u.name AS username, u."photoLink", p.*, f."followerId", f."followedId"
    FROM users AS u
    JOIN posts AS p
    ON u.id = p."userId"
    JOIN follows AS f
    ON p."userId" = f."followedId" OR p."userId" = f."followerId"
    WHERE f."followerId" = $1 OR p."userId" = $1
    ORDER BY p.id DESC
    LIMIT 20
  `, [userId])
};

async function postUserUrl(values){
  return connection.query(`
    INSERT INTO posts(link, description, "userId") VALUES ($1, $2, $3);
  `, values);
}

async function getPostById(postId){
  return connection.query(`
    SELECT *
    FROM posts
    WHERE id = $1;
  `, [postId]);
};

async function updatePost(postId, description) {
  return connection.query(`
    UPDATE posts
    SET description = $1
    WHERE id = $2;
  `, [description, postId]);
};

async function updatePostShareCount(shareCount, postId) {
  return connection.query(`
    UPDATE posts
    SET "shareCount" = $1
    WHERE id = $2;
  `, [shareCount, postId]);
};

async function deletePost(postId) {
  await connection.query(`
    DELETE
    FROM likes
    WHERE "postId" = $1;
  `, [postId]);

  await connection.query(`
    DELETE
    FROM comments
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
  /*return connection.query(`
  SELECT p.*, u.name, u."photoLink" 
  FROM posts AS p
  JOIN users AS u
  ON u.id = p."userId"
  JOIN shares AS s
  ON s."userId" = p."userId"
  WHERE "userId" = $1 OR id = s."postId"
  ORDER BY p."createdAt" DESC;*/

  return connection.query(`
    SELECT p.*, u.name, u."photoLink" 
    FROM posts AS p
    JOIN users AS u
    ON u.id = p."userId"
    WHERE "userId" = $1
    ORDER BY p."createdAt" DESC;
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
  updatePostShareCount,
  deletePost,
  getUserPosts,
  postHashtag,
  getPostInfoByHashtagName,
  postHashtagsPosts,
  getNewPosts
};

export default postsRepository;