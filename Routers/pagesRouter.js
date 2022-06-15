import {Router} from "express";

import validateToken from "../Middlewares/authValidator.js";
import validateHashtag from "../Middlewares/validateHashtag.js";
import { validateSchema } from "../Middlewares/validateSchema.js";
import { getPostByHashtag, getTrendingHashtags, postUrl } from "../Controllers/pagesController.js";

import postSchema from "../Schemas/postSchema.js";

const pagesRouter = Router();

pagesRouter.get('/trending', getTrendingHashtags);
pagesRouter.post('/posts', validateToken, validateSchema(postSchema), postUrl);
pagesRouter.get('/hashtag/:hashtag', validateToken, validateHashtag, getPostByHashtag); 

export default pagesRouter;