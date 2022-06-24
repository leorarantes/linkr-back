import { Router } from "express";
import { sharePost }from "../Controllers/sharesController.js";
import validateToken from "../Middlewares/authValidator.js";

const sharesRouter = Router();

sharesRouter.post('/share', validateToken, sharePost);

export default sharesRouter;