import {Router} from "express";

import userSchema from "../Schemas/userSchema.js";
import loginSchema from "../Schemas/loginSchema.js";
import {signup, signIn} from "../Controllers/authController.js";
import {validateSchema} from "../Middlewares/validateSchema.js";

const authRouter = Router();

authRouter.post('/signup', validateSchema(userSchema), signup);
authRouter.post('/signin', validateSchema(loginSchema), signIn);

export default authRouter;