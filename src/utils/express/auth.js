import Joi from '@hapi/joi';

import { RouteFunction } from 'utils/types';
import { userSchema, apiKeySchema } from './schemas';
import { AuthError, ForbiddenError } from './errors';

import { validate } from './middlewares';

/** @returns {RouteFunction} */
export function meAlias() {
  return (req, res, next) => {
    if (req.params.id === 'me') {
      req.params.id = req.user.id;
    }
    next();
  };
}

/** @returns {[RouteFunction]} */
export function hasApiKey() {
  const { API_KEY } = process.env;
  return [
    validate('query.api_key', apiKeySchema),
    (req, res, next) => {
      if (req.query.api_key !== API_KEY) {
        next(new AuthError());
      } else {
        next();
      }
    },
  ];
}

/** @returns {RouteFunction} */
export function isAuth() {
  return (req, res, next) => Joi.validate(req.user, userSchema).then(() => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      throw new Error();
    } else {
      next();
    }
  }).catch(() => {
    next(new AuthError());
  });
}

/** @returns {[RouteFunction]} */
export function isAdmin() {
  return [
    isAuth,
    (req, res, next) => {
      if (!req.user.isAdmin) {
        next(new ForbiddenError());
      } else {
        next();
      }
    },
  ];
}
