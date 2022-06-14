import {Router} from "express";

import { getUser } from "../Controllers/usersController.js";
import validateToken from "../Middlewares/authValidator.js";
import validateUserId from "../Middlewares/userValidator.js";

const usersRouter = Router();

usersRouter.get('/user/:id', validateToken, validateUserId, getUser);

export default usersRouter;