import Post from 'models/post'
import User from 'models/user'

import { getUserById } from './user'

import { RESOURCES, ACTIONS, InternalServerError } from 'utils/express/errors'

/**
 * Get posts by user
 * @param {number} userId 
 * @returns {Promise<[Post]>}
 */
export async function getPostsByUser (userId) {
  const user = await User.getById(userId)
  try {
    const posts = await user.getPosts()
    return posts.map((post) => {
      return post.toJSON()
    })
  } catch (error) {
    throw new InternalServerError({
      error,
      resource: RESOURCES.POST,
      action: ACTIONS.LIST,
      message: `Impossible to list posts from user with id=${userId}`,
    })
  }
}

/**
 * Create a post of userId
 * @param {Post} postData 
 * @param {number} userId 
 * @returns {Promise<Post>}
 */
export async function createPost (postData, userId) {
  const user = await getUserById(userId)
  try {
    return await user.addPost(postData)
  } catch (error) {
    throw new InternalServerError({
      error,
      resource: RESOURCES.POST,
      action: ACTIONS.CREATE,
    })
  }
}
