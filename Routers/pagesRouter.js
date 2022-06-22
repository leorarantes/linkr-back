import {Router} from "express";

import validateToken from "../Middlewares/authValidator.js";
import { getPostByHashtagName, hashtagExists, validateHashtag } from "../Middlewares/validateHashtag.js";
import { validateUserId } from "../Middlewares/userValidator.js";
import { validateSchema } from "../Middlewares/validateSchema.js";
import { validateDescription } from "../Middlewares/validateDescription.js";
import { getPostByHashtag, getTrendingHashtags, postUrl, getAllPosts, updatePost, deletePost, getPostByUser, postHashtag, postHashtagsPost, getCommentsAmount, getComments } from "../Controllers/pagesController.js";

import postSchema from "../Schemas/postSchema.js";
import descriptionSchema from "../Schemas/descriptionSchema.js";

const pagesRouter = Router();

pagesRouter.get('/timeline/:userId', validateToken, getAllPosts);
pagesRouter.get('/trending', getTrendingHashtags);
pagesRouter.get('/hashtag/:hashtag', validateToken, validateHashtag, getPostByHashtag);
pagesRouter.get('/posts/:userId', validateToken, validateUserId, getPostByUser);
pagesRouter.post('/posts', validateToken, validateSchema(postSchema), postUrl);
pagesRouter.post('/hashtag', validateToken, hashtagExists, postHashtag);
pagesRouter.post('/hashtagsPosts', validateToken, getPostByHashtagName, postHashtagsPost);
pagesRouter.put('/posts/:postId', validateToken, validateDescription(descriptionSchema), updatePost);
pagesRouter.delete('/posts/:postId', validateToken, deletePost);
pagesRouter.get('/comments/count/:postId', validateToken, getCommentsAmount);
pagesRouter.get('/comments/:postId', validateToken, getComments)

export default pagesRouter;