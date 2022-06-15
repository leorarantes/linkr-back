import connection from "../config/db.js";

async function checkToken(token){
  return connection.query(`
    SELECT *
    FROM sessions
    WHERE token = $1 AND expired = FALSE;
  `, [token]);
};

async function createSession(userId, token) {
	const now = parseFloat((Date.now()/60000).toFixed(1));
    return connection.query("INSERT INTO sessions (\"userId\", token, \"lastStatus\") VALUES ($1, $2, $3)", [userId, token, now]);
}

async function expireSession(sessionId) {
  return connection.query("UPDATE sessions SET expired = TRUE WHERE id = $1", sessionId);
}

async function updateSessions(sessionId) {
  const now = parseFloat((Date.now()/60000).toFixed(1));
  return connection.query("UPDATE sessions SET \"lastStatus\" = $1 WHERE id = $2", [now, sessionId]);
}

const sessionsRepository = {
  checkToken,
  createSession,
  expireSession,
  updateSessions
};

export default sessionsRepository;