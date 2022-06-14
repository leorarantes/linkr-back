import connection from "../config/db.js";

async function checkToken(token){
  return connection.query(`
    SELECT *
    FROM sessions
    WHERE token = $1;
  `, [token]);
};

const sessionsRepository = {
  checkToken
};

export default sessionsRepository;