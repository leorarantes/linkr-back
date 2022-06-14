import chalk from "chalk";
import postsRepository from "../Repositories/postsRepository.js";

export async function getPostByHashtag(req,res){
  const {id} = res.locals.hashtag;

  try {
    const postRequest = await postsRepository.getPostInfoByHashtag(id);
    const posts = postRequest.rows;

    return res.status(200).send(posts);
  } catch (e) {
    console.log(chalk.bold.red(e));
    return res.sendStatus(500);
  }
}