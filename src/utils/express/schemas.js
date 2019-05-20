import Joi from '@hapi/joi'

export const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  id: Joi.number().integer().positive(),
})

export const projectSchema = Joi.object().keys({
  name: Joi.string().required(),
})

export const idSchema = Joi.number().integer().positive()
