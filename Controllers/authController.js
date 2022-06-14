import chalk from "chalk";

import usersRepository from "../Repositories/usersRepository.js";

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