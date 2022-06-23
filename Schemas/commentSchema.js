import joi from "joi";

const commentSchema = joi.object({
	postId: joi.number().required(),
	comment: joi.string().required(),
	authorId: joi.number().required()
})

export default commentSchema