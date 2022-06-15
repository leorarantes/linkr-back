import {Router} from "express";
import validateToken from "../Middlewares/authValidator.js";
import validateHashtag from "../Middlewares/validateHashtag.js";
import { getAllPosts, getPostByHashtag } from "../Controllers/pagesController.js";

const pagesRouter = Router();

pagesRouter.get('/hashtag/:hashtag', validateToken, validateHashtag, getPostByHashtag)
pagesRouter.get('/timeline', validateToken, getAllPosts)

export default pagesRouter;