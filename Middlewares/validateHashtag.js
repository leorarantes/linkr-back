import hashtagRepository from "../Repositories/hashtagsRepository.js";
import postsRepository from "../Repositories/postsRepository.js";

export async function validateHashtag(req, res, next){
  const {hashtag} = req.params;

  if(!hashtag){
    return res.status(400).send('No hashtag');
  }

  try {
    const hashtagRequest = await hashtagRepository.getHashtagInfo(hashtag);

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

export async function hashtagExists(req, res, next){
  const { hashtag } = req.body;

  try {
    const hashtagRequest = await hashtagRepository.getHashtagInfo(hashtag);

    if(hashtagRequest.rows.length > 0){
      await hashtagRepository.updateHashtag(hashtag);
      return res.sendStatus(200);
    }

    next();
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

export async function getPostByHashtagName(req, res, next){
  const { hashtag } = req.body;

  try {
    const hashtagRequest = await postsRepository.getPostInfoByHashtagName(hashtag);

    if(hashtagRequest.length === 0){
      return res.sendStatus(404);
    }

    const postInfo = hashtagRequest.rows[hashtagRequest.rows.length-1];
    res.locals.postInfo = postInfo;

    next();
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}
