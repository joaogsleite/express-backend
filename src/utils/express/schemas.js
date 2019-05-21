import Joi from '@hapi/joi'

export const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  passport: Joi.string().min(6).required(),
})

export const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  id: Joi.number().integer().positive(),
})

export const projectSchema = Joi.object().keys({
  name: Joi.string().required(),
})

export const idSchema = Joi.number().integer().positive()

export const apiKeySchema = Joi.string()
