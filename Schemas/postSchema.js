import joi from "joi";

const postSchema = joi.object({
  link: joi.string().uri({scheme: [/https?/]}).required(),
  description: joi.string().allow('')
});

export default postSchema;