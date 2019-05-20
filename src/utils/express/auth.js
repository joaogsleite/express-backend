import Joi from '@hapi/joi'

import { userSchema } from './schemas'
import HttpError, { TYPES } from './errors'

import { RouteFunction } from 'utils/types'

/** @returns {RouteFunction} */
export function meAlias() {
  return (req, res, next) => {
    if (req.params.id === 'me') {
      req.params.id = req.user.id
    }
    next()
  }
}

/**
 * @returns {RouteFunction}
 */
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

/**
 * @returns {RouteFunction}
 */
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
