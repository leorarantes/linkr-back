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
  const { usersInfo } = res.locals;

  try {
    res.status(200).send(usersInfo)
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}