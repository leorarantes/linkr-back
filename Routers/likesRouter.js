import { Router } from "express";
import likePost from "../Controllers/likesController.js";
import validateToken from "../Middlewares/authValidator.js";

const likesRouter = Router();

likesRouter.post('/like', validateToken, likePost);

export default likesRouter;