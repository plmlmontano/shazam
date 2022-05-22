import Joi from 'joi'

const gameSchema = Joi.object({
    id: Joi.string(),
    type: Joi.string().required(),
    subtitle: Joi.string().required(),
    share: Joi.object().required(),
    images: Joi.object().required(),
    hub: Joi.object().required(),
    artists: Joi.array().required(),
    layout: Joi.string().required(),
    key: Joi.string().required(),
    title: Joi.string().required(),
    url: Joi.string().required()
})

export default gameSchema;
