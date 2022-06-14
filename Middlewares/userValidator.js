import usersRepository from "../Repositories/usersRepository.js";

async function validateUserId(req, res, next){
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

export default validateUserId;