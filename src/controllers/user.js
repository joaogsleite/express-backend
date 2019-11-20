import User from 'models/user';

import {
  ForbiddenError, ResourceNotFoundError, RESOURCES, ACTIONS,
} from 'utils/express/errors';

/**
 * Get user by id
 * @param {number} userId
 * @param {number} whoRequested
 * @returns {Promise<User>}
 */
export async function getUserById(userId, whoRequested) {
  if (whoRequested && userId !== whoRequested) {
    throw new ForbiddenError();
  } else {
    try {
      const user = await User.getById(userId);
      return user.toJSON();
    } catch (error) {
      throw new ResourceNotFoundError({
        error,
        resource: RESOURCES.USER,
        id: userId,
      });
    }
  }
}

export async function findUsersByEmail(email) {
  const query = { email };
  try {
    const users = await User.findAll(query);
    return users.map((user) => user.toJSON());
  } catch (error) {
    throw new ResourceNotFoundError({
      error,
      resource: RESOURCES.USER,
      action: ACTIONS.FIND,
      query: {
        email,
      },
    });
  }
}
