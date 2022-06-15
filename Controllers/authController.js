import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import usersRepository from "../Repositories/usersRepository.js";
import sessionsRepository from "../Repositories/sessionsRepository.js";

export async function signup(req,res){
  const user = req.body;
  
  try {
    const userExists = await usersRepository.checkUserEmail(user.email);
    if(userExists.rowCount > 0){
      return res.sendStatus(409);
    }
    
    await usersRepository.createUser(user.name, user.email, user.password);

    return res.sendStatus(201);
  } catch (e) {
    console.log(chalk.bold.red(e));
    return res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  try {
      const {email, password} = req.body;

      const existingUser = await usersRepository.checkUserEmail(email);
      if (existingUser.rowCount === 0) return res.sendStatus(404);
      if (existingUser.rowCount > 0 && bcrypt.compareSync(password, existingUser.rows[0].password)) {
          const token = uuid();
          await sessionsRepository.createSession(existingUser.rows[0].id, token);
          
          res.status(200).send({token});
      } else {
          res.sendStatus(401);
      }
  } catch (error) {
      console.log("Error logging in user.", error);
      res.status(500).send("Error logging in user.");
  }
}