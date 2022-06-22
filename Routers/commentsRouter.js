import { Router } from "express";
import { getComments, getCommentsAmount, postComment } from "../Controllers/commentsController.js";
import validateToken from "../Middlewares/authValidator.js";
import { validateSchema } from "../Middlewares/validateSchema.js";
import commentSchema from "../Schemas/commentSchema.js";

const commentsRouter = Router();

commentsRouter.post('/comment', validateToken, validateSchema(commentSchema), postComment);
commentsRouter.get('/comments/count/:postId', validateToken, getCommentsAmount);
commentsRouter.get('/comments/:postId', validateToken, getComments);

export default commentsRouter