import joi from "joi";

const descriptionSchema = joi.object({
    description: joi.string().required()
});

export default descriptionSchema;