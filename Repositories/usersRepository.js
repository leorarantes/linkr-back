import bcrypt from "bcrypt";

import connection from "../config/db.js";

async function checkUserEmail(email){
  return connection.query(`
    SELECT *
    FROM users
    WHERE email = $1;
  `, [email]);
};

async function createUser(name, email, password, photoLink){
  const SALT = 10;
  const encryptedPassword = bcrypt.hashSync(password, SALT);

  return connection.query(`
    INSERT INTO users(name, email, password, "photoLink")
    VALUES ($1, $2, $3, $4);
  `, [name, email, encryptedPassword, photoLink]);
};

async function getUserById(id){
  return connection.query(`
    SELECT users.id, users.name, users.email, users."photoLink"
    FROM users
    WHERE id = $1  
  `, [id]);
}

async function getUserByName(name){
  return connection.query(`
    SELECT users.name, users."photoLink", users.id
    FROM users
    WHERE name ILIKE $1
  `, [name + '%'])
};

async function getFollowers(id, name){
  return connection.query(`
    SELECT u.name, u.id FROM follows f
    JOIN users u ON u.id = f."followedId"
    WHERE f."followerId" = $1 AND name ILIKE $2
  `, [id,name + '%'])
}

async function getFollowersAmmount(userId){
  return connection.query(`
    SELECT COUNT(DISTINCT f."followedId") AS "followsAmmount", COUNT(p.*) AS "postsAmmount"
    FROM follows as f
    LEFT JOIN posts as p
    ON p."userId" = f."followedId"
    WHERE f."followerId" = $1
  `, [userId])
}

const usersRepository = {
  createUser,
  getUserById,
  getUserByName,
  checkUserEmail,
  getFollowersAmmount,
  getFollowers
};

export default usersRepository;