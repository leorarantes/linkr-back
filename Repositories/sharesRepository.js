import connection from "../config/db.js";

async function addShare(postId, userId) {
    return connection.query(`
        INSERT INTO shares("postId", "userId") VALUES ($1, $2);
    `, [postId, userId]);
}

const sharesRepository = {
    addShare
};

export default sharesRepository;