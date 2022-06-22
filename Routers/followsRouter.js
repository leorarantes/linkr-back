import {Router} from "express";
import validateToken from "../Middlewares/authValidator.js";
import { followUser, unfollowUser } from "../Controllers/followsController.js";

const followsRouter = Router();

followsRouter.post('/follows/:followedId', validateToken, followUser);
followsRouter.delete('/follows/:followedId', validateToken, unfollowUser);

export default followsRouter;