import User from 'models/user'

import HttpError, { TYPES } from 'utils/express/errors'
import { createHttpError } from 'utils/express/middlewares'

/**
 * Get user by id
 * @param {number} userId 
 * @param {number} whoRequested 
 * @returns {Promise<User>}
 */
export const getUserById = (userId, whoRequested) => {
  if (whoRequested && userId !== whoRequested) {
    throw new HttpError({ type: TYPES.FORBIDDEN })
  } else {
    return User.getById(userId).then((user) => {
      return user.toJSON()
    }).catch(createHttpError({
      type: TYPES.RESOURCE_NOT_FOUND,
      id: userId,
    }))
  }
}
