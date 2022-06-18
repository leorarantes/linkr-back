import connection from "../config/db.js";

async function getUserLiked (userId, postId) {
	return connection.query(`
		SELECT * FROM likes
		WHERE "userId" = $1 AND "postId" = $2
	`, [userId, postId])
};

async function getWhoLiked (postId) {
	return connection.query(`
		SELECT u.name, u.id FROM likes l
		JOIN users u ON l."userId" = u.id
		WHERE l."postId" = $1
	`, [postId]);
};

async function likePost (userId, postId) {
	return connection.query(`
		INSERT INTO likes ("userId", "postId")
		VALUES ($1,$2)	
	`, [userId,postId])
};

async function dislikePost (userId, postId) {
	return connection.query(`
		DELETE FROM likes
		WHERE "userId" = $1 AND "postId" = $2	
	`, [userId,postId])
};

async function increaseLikeCount (postId) {
	return connection.query(`
		UPDATE posts
		SET "likeCount" = "likeCount" + 1
		WHERE id = $1
	`, [postId])
};

async function decreaseLikeCount (postId) {
	return connection.query(`
		UPDATE posts
		SET "likeCount" = "likeCount" - 1
		WHERE id = $1
	`, [postId])
};

const likesRepositoy = {
	getUserLiked,
	likePost,
	dislikePost,
	increaseLikeCount,
	decreaseLikeCount,
	getWhoLiked
}

export default likesRepositoy