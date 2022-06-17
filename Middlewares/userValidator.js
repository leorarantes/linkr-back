import usersRepository from "../Repositories/usersRepository.js";

export async function validateUserId(req, res, next){
  const {id} = req.params;

  if(!id){
    return res.status(401).send('No user id');
  }

  try {
    const userRequest = await usersRepository.getUserById(id);
    
    if(userRequest.rowCount === 0){
      return res.status(404).send(`User doesn't exist`);
    }

    const [userInfo] = userRequest.rows;
    res.locals.user = userInfo;
    next();
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

export async function validateUsersSearch(req, res, next){
  const { name } = req.params;
  const userName = name.trim();

  if(userName === ''){
    return res.sendStatus(400);
  }

  try {
    const usersRequest = await usersRepository.getUserByName(userName);
    const usersInfo = usersRequest.rows;

    res.locals.usersInfo = usersInfo;
    next();
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}