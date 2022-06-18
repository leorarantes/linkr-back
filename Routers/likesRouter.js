import { Router } from "express";
import {likePost, likesInPost }from "../Controllers/likesController.js";
import validateToken from "../Middlewares/authValidator.js";

const likesRouter = Router();

likesRouter.post('/like', validateToken, likePost);
likesRouter.get('/post-likes/:id', validateToken, likesInPost)

export default likesRouter;