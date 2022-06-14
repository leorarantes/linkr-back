import {Router} from "express";

import validateToken from "../Middlewares/authValidator.js";
import validateHashtag from "../Middlewares/validateHashtag.js";
import { validateSchema } from "../Middlewares/validateSchema.js";
import { getPostByHashtag, postUrl } from "../Controllers/pagesController.js";

import postSchema from "../Schemas/postSchema.js";

const pagesRouter = Router();

pagesRouter.get('/hashtag/:hashtag', validateToken, validateHashtag, getPostByHashtag)
pagesRouter.post('/posts', validateSchema(postSchema), postUrl);

export default pagesRouter;