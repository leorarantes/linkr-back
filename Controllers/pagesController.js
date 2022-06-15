import chalk from "chalk";
import postsRepository from "../Repositories/postsRepository.js";
import urlMetadata from "url-metadata"

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

export async function getAllPosts(req,res) {
  try {
    const { rows : posts} = await postsRepository.getAllPosts()
    const response = [];

    if (posts) {
      for (let i =0; i < posts.length; i++) {
        const snnipet = await urlMetadata(posts[i].link)
  
        response.push({
          ...posts[i],
          linkTitle: snnipet.title,
          linkDesc: snnipet.description,
          linkImg: snnipet.image
        })
      }
    }
    
    return res.send(response)
  }
  catch (e) {
    console.log(chalk.bold.red(e));
    return res.sendStatus(500);
  }
}

export async function postUrl(req, res) {
  const { userId } = res.locals;
  const post = Object.values(req.body);
  const values = [...post, userId];

  try {
    await postsRepository.postUserUrl(values, userId);

    return res.sendStatus(201);
  } catch (e) {
    console.log(chalk.bold.red(e));
    return res.sendStatus(500);
  }
}