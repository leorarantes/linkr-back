import connection from "../config/db.js";

async function commentPubli (commenterId, authorId, postId, comment) {
	return connection.query(`
		INSERT INTO comments ("commenterId", "authorId", "postId", comment)
		VALUES ($1,$2,$3,$4)`, [commenterId, authorId, postId, comment])
}

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

const commentsRepository = { 
	commentPubli,
	getCommentsCount,
	getComments }

export default commentsRepository