import Joi from '@hapi/joi'

import { userSchema, apiKeySchema } from './schemas'
import HttpError, { TYPES } from './errors'

import { RouteFunction } from 'utils/types'
import { validate } from './middlewares'

/** @returns {RouteFunction} */
export function meAlias() {
  return (req, res, next) => {
    if (req.params.id === 'me') {
      req.params.id = req.user.id
    }
    next()
  }
}

/** @returns {[RouteFunction]} */
export function hasApiKey () {
  const { API_KEY } = process.env
  return [
    validate('query.api_key', apiKeySchema),
    (req, res, next) => {
      if (req.query.api_key !== API_KEY) {
        next(new HttpError({
          type: TYPES.AUTH_ERROR
        }))
      } else {
        next()
      }
    },
  ]
}

/** @returns {RouteFunction} */
export function isAuth() {
  return (req, res, next) => {
    return Joi.validate(req.user, userSchema).then(() => {
      if (!req.isAuthenticated || !req.isAuthenticated()) {
        throw new Error()
      } else {
        next()
      }
    }).catch((error) => {
      next(new HttpError({
        type: TYPES.AUTH_ERROR,
      }))
    })
  }
}

/** @returns {[RouteFunction]} */
export function isAdmin() {
  return [
    isAuth,
    (req, res, next) => {
      if (!req.user.isAdmin) {
        next(new HttpError({
          type: TYPES.FORBIDDEN,
        }))
      } else {
        next()
      }
    },
  ]
}
