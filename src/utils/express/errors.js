
export const RESOURCES = {
  PROJECT: 'project',
  USER: 'user',
}
export const ACTIONS = {
  GET: 'get',
  LIST: 'list',
  FIND: 'find',
  CREATE: 'create',
  DELETE: 'delete',
}
export const TYPES = {
  AUTH_ERROR: 'AuthError',
  FORBIDDEN: 'Forbidden',
  INPUT_ERROR: 'InputError',
  RESOURCE_NOT_FOUND: 'ResourceNotFound',
  INTERNAL_SERVER_ERROR: 'InternalServerError',
}
export const STATUS_CODES = {
  AuthError: 401,
  Forbidden: 403,
  InputError: 422,
  ResourceNotFound: 404,
  InternalServerError: 500,
}

export class HttpError extends Error {
  
  constructor(props) {
    super(props.message)
    this.type = props.type || TYPES.INTERNAL_SERVER_ERROR
    this.statusCode = props.statusCode || STATUS_CODES[this.type] || 500
    this.isHttpError = true
    if (props.details) {
      if (Array.isArray(props.details)) {
        this.details = [ ...props.details ]
      } else {
        this.details = [ props.details ]
      }
    } else {
      this.details = []
    }
    if (props.resource || props.message || props.code || props.action) {
      this.details.push({
        action: props.action,
        code: props.code,
        message: (
          props.message || 
          (props.action && props.resource && 
            `Impossible to ${props.action} ${props.resource} ${props.id ? 'with id='+id : ''}`
          ) || 
          (props.id &&
            `Impossible to get ${props.resource || 'resource'} with id=${id}`
          )
        ),
        resource: props.resource,
        id: props.id,
      })
    }
    if (props.raw || props.error) {
      let error = {}
      if (props.raw) {
        error = props.raw
      } else if (props.error) {
        error = props.error
      }
      this.details.push({
        type: 'RawError',
        code: -1,
        message: error.stack,
      })
    }
  }
  toString () {
    return `${this.type} ${this.statusCode}`
  }
}

export class AuthError extends HttpError {
  static LOGIN_INCORRECT = 1
  static OAUTH_CREATE_USER = 2
  constructor(props) {
    super({...props, type: TYPES.AUTH_ERROR })
  }
}
export class ForbiddenError extends HttpError {
  constructor(props) {
    super({...props, type: TYPES.FORBIDDEN })
  }
}
export class InputError extends HttpError {
  constructor(props) {
    super({...props, type: TYPES.INPUT_ERROR })
  }
}
export class ResourceNotFoundError extends HttpError {
  constructor(props) {
    super({...props, type: TYPES.RESOURCE_NOT_FOUND })
  }
}
export class InternalServerError extends HttpError {
  constructor(props) {
    super({...props, type: TYPES.INTERNAL_SERVER_ERROR })
  }
}
