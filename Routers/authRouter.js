import {Router} from "express";

import userSchema from "../Schemas/userSchema.js";
import { signup } from "../Controllers/authController.js";
import { validateSchema } from "../Middlewares/validateSchema.js";

const authRouter = Router();

authRouter.post('/signup', validateSchema(userSchema), signup);

export default authRouter;