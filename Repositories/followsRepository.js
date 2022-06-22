import connection from "../config/db.js";

async function getFollow(followerId, followedId) {
    return connection.query(`
        SELECT *
        FROM follows
        WHERE "followerId" = $1 AND "followedId" = $2;
    `, [followerId, followedId])
};

async function followUser(followerId, followedId) {
    return connection.query(`
        INSERT INTO follows("followerId", "followedId") VALUES ($1, $2);
    `, [followerId, followedId])
};

async function unfollowUser(followerId, followedId) {
    return connection.query(`
        DELETE
        FROM follows
        WHERE "followerId" = $1 AND "followedId" = $2;
    `, [followerId, followedId]);
}

const followsRepository = {
    getFollow,
    followUser,
    unfollowUser
};

export default followsRepository;