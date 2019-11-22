import Joi from '@hapi/joi';

import { RouteFunction } from 'utils/types';
import { InternalServerError, InputError, ResourceNotFoundError } from './errors';
import { getPathFromObj } from '../index';

export { meAlias, isAuth, isAdmin } from './auth';

/**
 * Runs a controller function with arguments from req object
 *
 * @param {Function} func
 * @param {string[]} args
 * @returns {RouteFunction}
 */
export function runController(func, args) {
  return (req, res, next) => {
    Promise.resolve().then(() => func(...args.map((arg) => getPathFromObj(arg, req)))).then((data) => {
      res.json(data);
    }).catch((error) => {
      if (error.isHttpError) {
        next(error);
      } else {
        next(new InternalServerError({ error }));
      }
    });
  };
}

/**
 * Validates {path} on {req} object with provided {schema}
 *
 * @param {string} path
 * @param {Joi} schema
 * @returns {RouteFunction}
 */
export function validate(path, schema) {
  return (req, res, next) => {
    const objToValidate = getPathFromObj(path, req);
    Joi.validate(objToValidate, schema).then(() => {
      next();
    }).catch((error) => {
      next(new InputError({ error }));
    });
  };
}


/**
 *
 */
export function errorHandler(error, req, res) {
  const { statusCode } = error;
  delete error.isHttpError;
  delete error.statusCode;
  if (process.env.NODE_ENV !== 'development') {
    error.details = error.details.filter((detail) => detail.code !== -1 && detail.type !== 'RawError');
  }
  res.status(statusCode).json(error);
}

/**
 *
 */
export function notFound(req, res, next) {
  next(new ResourceNotFoundError());
}
