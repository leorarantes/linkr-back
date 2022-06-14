import hashtagRepository from "../Repositories/hashtagsRepository.js";

async function validateHashtag(req, res, next){
  const {hashtag} = req.params;

  if(!hashtag){
    return res.status(400).send('No hashtag');
  }

  try {
  const hashtagRequest = await hashtagRepository.getHashtagInfo(hashtag);
  console.log(hashtagRequest.rows.length)

  if(hashtagRequest.rowCount === 0){
    return res.status(400).send(`Hashtag doesn't exist`);
  }
 
  const [hashtagInfo] = hashtagRequest.rows;
  res.locals.hashtag = hashtagInfo;
  next();
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

export default validateHashtag;