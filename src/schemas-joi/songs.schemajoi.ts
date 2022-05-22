import Joi from 'joi'

const gameSchema = Joi.object({
    id: Joi.string(),
    layout: Joi.string().required(),
    key: Joi.string().required(),
    title: Joi.string().required()
})

export default gameSchema;