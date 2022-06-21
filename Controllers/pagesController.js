import chalk from "chalk";
import urlMetadata from "url-metadata"

import postsRepository from "../Repositories/postsRepository.js";
import hashtagRepository from "../Repositories/hashtagsRepository.js";

export async function getPostByHashtag(req, res) {
  const { id } = res.locals.hashtag;
  const response = [];

  try {
    const postRequest = await postsRepository.getPostInfoByHashtag(id);
    const posts = postRequest.rows;

    if (posts) {
      for (let i = 0; i < posts.length; i++) {
        const snnipet = await urlMetadata(posts[i].link)

        response.push({
          ...posts[i],
          linkTitle: snnipet.title,
          linkDesc: snnipet.description,
          linkImg: snnipet.image
        })
      }
    }

    return res.status(200).send(response)
  } catch (e) {
    console.log(chalk.bold.red(e));
    return res.sendStatus(500);
  }
};

export async function getAllPosts(req, res) {
  try {
    const { rows: posts } = await postsRepository.getAllPosts()
    const response = [];

    if (posts) {
      for (let i = 0; i < posts.length; i++) {
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

export async function getTrendingHashtags(req, res) {
  try {
    const hashtagsRequest = await hashtagRepository.getTrendingHashtags();
    const trendingHashtags = hashtagsRequest.rows
    return res.status(200).send(trendingHashtags);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

export async function updatePost(req, res) {
  try {
    const { user } = res.locals;
    const { postId } = req.params;
    const { description } = req.body;

    const { rows: posts } = await postsRepository.getPostById(user.id, postId);
    if (posts.length === 0) return res.sendStatus(404);

    await postsRepository.updatePost(postId, description);

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error while updating post.");
  }
}

export async function deletePost(req, res) {
  try {
    const { user } = res.locals;
    const { postId } = req.params;

    const { rows: posts } = await postsRepository.getPostById(user.id, postId);
    if (posts.length === 0) return res.sendStatus(404);

    await postsRepository.deletePost(postId);

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error while deleting post.");
  }
}

export async function getPostByUser(req, res) {
  const { userId } = req.params;
  const response = [];

  try {
    const postsQuery = await postsRepository.getUserPosts(userId);
    const posts = postsQuery.rows;

    if (posts) {
      for (let i = 0; i < posts.length; i++) {
        const snnipet = await urlMetadata(posts[i].link)

        response.push({
          ...posts[i],
          linkTitle: snnipet.title,
          linkDesc: snnipet.description,
          linkImg: snnipet.image
        })
      }
    }

    return res.status(200).send(response)
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error while getting user posts.");
  }
};

export async function postHashtag(req, res){
  const { hashtag } = req.body;
  try {
    await postsRepository.postHashtag(hashtag);
    return res.sendStatus(200);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

export async function postHashtagsPost(req,res){
  const { hashtag } = req.body;
  const { postInfo } = res.locals;

  try {
    const hashtagRequest = await hashtagRepository.getHashtagInfo(hashtag);
    const [hashtagInfo] = hashtagRequest.rows;
    
    await postsRepository.postHashtagsPosts(hashtagInfo.id, postInfo.id);

    return res.sendStatus(200);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

