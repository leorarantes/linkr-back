import {Router} from "express";

import validateToken from "../Middlewares/authValidator.js";
import { validateUserId, validateUsersSearch } from "../Middlewares/userValidator.js";
import { getFollowersAmmount, getOtherUserInfo, getUser, getUsersByName } from "../Controllers/usersController.js";

const usersRouter = Router();

usersRouter.get('/user/:userId', validateToken, validateUserId, getUser);
usersRouter.get('/other-user/:userId', validateToken, getOtherUserInfo);
usersRouter.get('/users/:name', validateToken, validateUsersSearch, getUsersByName);
usersRouter.get('/followers/:userId', validateUserId, getFollowersAmmount);

export default usersRouter;