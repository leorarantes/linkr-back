import chalk from "chalk";
import postsRepository from "../Repositories/postsRepository.js";

export async function getPostByHashtag(req, res) {
  const { id } = res.locals.hashtag;

  try {
    const postRequest = await postsRepository.getPostInfoByHashtag(id);
    const posts = postRequest.rows;

    return res.status(200).send(posts);
  } catch (e) {
    console.log(chalk.bold.red(e));
    return res.sendStatus(500);
  }
}

export async function postUrl(req, res) {
  const { user } = res.locals;
  const post = Object.values(req.body);
  const values = [...post, user.id];

  try {
    await postsRepository.postUserUrl(values);

    return res.sendStatus(201);
  } catch (e) {
    console.log(chalk.bold.red(e));
    return res.sendStatus(500);
  }
}