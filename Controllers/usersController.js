import usersRepository from "../Repositories/usersRepository.js";

export async function getUser(req,res){
  const {user} = res.locals;

  try {
    return res.status(200).send(user);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

export async function getUsersByName(req,res){
  const { userName } = res.locals;

  try {
    const usersRequest = await usersRepository.getUserByName(userName);
    const usersInfo = usersRequest.rows;

    res.status(200).send(usersInfo)
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

export async function getFollowersAmmount(req, res){
  const { userId } = req.params;

  try {
    const followersRequest = await usersRepository.getFollowersAmmount(userId);
    const followersAmmount = followersRequest.rows;

    return res.status(200).send(followersAmmount);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}