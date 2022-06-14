import sessionsRepository from "../Repositories/sessionsRepository.js";

async function validateToken(req,res,next){
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if(!token){
    return res.status(401).send('No token')
  }

  try {
    const tokenRequest = await sessionsRepository.checkToken(token);
    if(tokenRequest.rowCount < 1){
      return res.status(401).send('Invalid session');
    };

    const [session] = tokenRequest.rows;
    const userId = session.userId;

    res.locals.userId = userId;
    next();
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

export default validateToken;