import User from 'models/user'

import { ForbiddenError, ResourceNotFoundError, RESOURCES } from 'utils/express/errors'

/**
 * Get user by id
 * @param {number} userId 
 * @param {number} whoRequested 
 * @returns {Promise<User>}
 */
export async function getUserById (userId, whoRequested) {
  if (whoRequested && userId !== whoRequested) {
    throw new ForbiddenError()
  } else {
    try {
      const user = await User.getById(userId)
      return user.toJSON()
    } catch (error) {
      throw new ResourceNotFoundError({
        error,
        resource: RESOURCES.USER, 
        id: userId,
      })
    }
  }
}
