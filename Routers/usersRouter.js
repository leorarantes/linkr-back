import {Router} from "express";

import validateToken from "../Middlewares/authValidator.js";
import { getUser, getUsersByName } from "../Controllers/usersController.js";
import { validateUserId, validateUsersSearch } from "../Middlewares/userValidator.js";

const usersRouter = Router();

usersRouter.get('/user/:userId', validateToken, validateUserId, getUser);
usersRouter.get('/users/:name', validateToken, validateUsersSearch, getUsersByName);
usersRouter.get('/users/:name', validateToken, validateUsersSearch, getUsersByName);

export default usersRouter;