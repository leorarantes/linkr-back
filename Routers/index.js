import {Router} from "express";

import authRouter from "./authRouter.js";
import likesRouter from "./likesRouter.js";
import pagesRouter from "./pagesRouter.js";
import usersRouter from "./usersRouter.js";
import followsRouter from "./followsRouter.js";
import commentsRouter from "./commentsRouter.js";
import sharesRouter from "./sharesRouter.js";

const router = Router();

router.use(authRouter);
router.use(pagesRouter);
router.use(usersRouter);
router.use(likesRouter);
router.use(followsRouter);
router.use(commentsRouter);
router.use(sharesRouter);

export default router;