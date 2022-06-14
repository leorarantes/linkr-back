import {Router} from "express";

import authRouter from "./authRouter.js";
import pagesRouter from "./pagesRouter.js";

const router = Router();

router.use(authRouter);
router.use(pagesRouter)

export default router;