import usersRepository from "../Repositories/usersRepository.js";
import followsRepository from "../Repositories/followsRepository.js";

export async function getUser(req,res){
  const {user} = res.locals;

  try {
    return res.status(200).send(user);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

export async function getOtherUserInfo(req,res){
  const { user } = res.locals;
  const otherUserId = parseInt(req.params.userId);
  if(otherUserId === 'NaN') return res.sendStatus(400);
  
  try {
    const otherUserInfoQuery = await usersRepository.getUserById(otherUserId);
    if(otherUserInfoQuery.rowCount === 0) return res.sendStatus(404);
    const [otherUserInfo] = otherUserInfoQuery.rows;

    const followQuery = await followsRepository.getFollow(user.id, otherUserInfo.id);
    if(followQuery.rowCount === 0) {
      const response = {...otherUserInfo, following: false};
      return res.status(200).send(response);
    }
    else {
      const response = {...otherUserInfo, following: true};
      return res.status(200).send(response);
    }
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

export async function getUsersByName(req,res){
  const { userName, user } = res.locals;
  try {
    const usersRequest = await usersRepository.getUserByName(userName);
    const usersInfo = usersRequest.rows;

    const followersRequest = await usersRepository.getFollowers(user.id, userName);
    const usersFollowers = followersRequest.rows;
    
    
    usersInfo.sort((a,b) =>usersFollowers.some(item => item.id === b.id) - usersFollowers.some(item => item.id === a.id));

    const response = [];

    for(let i = 0; i < usersInfo.length; i++) {
      response.push({
        ...usersInfo[i],
        followed: usersFollowers.some(item => item.id === usersInfo[i].id)
      })
    }

    res.status(200).send(response)
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