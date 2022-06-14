import bcrypt from "bcrypt";

import connection from "../config/db.js";

async function checkUserEmail(email){
  return connection.query(`
    SELECT *
    FROM users
    WHERE email = $1;
  `, [email]);
};

async function createUser(name, email, password){
  const SALT = 10;
  const encryptedPassword = bcrypt.hashSync(password, SALT);

  return connection.query(`
    INSERT INTO users(name, email, password)
    VALUES ($1, $2, $3);
  `, [name, email, encryptedPassword]);
};

const usersRepository = {
  checkUserEmail,
  createUser
};

export default usersRepository;