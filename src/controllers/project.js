import Project from 'models/project'
import User from 'models/user'

import { getUserById } from './user'

import { RESOURCES, ACTIONS, InternalServerError } from 'utils/express/errors'

/**
 * Get projects by user
 * @param {number} userId 
 * @returns {Promise<[Project]>}
 */
export async function getProjectsByUser (userId) {
  const user = await User.getById(userId)
  try {
    const projects = await user.getProjects()
    return projects.map((project) => {
      return project.toJSON()
    })
  } catch (error) {
    throw new InternalServerError({
      error,
      resource: RESOURCES.PROJECT,
      action: ACTIONS.LIST,
      message: `Impossible to list projects from user with id=${userId}`,
    })
  }
}

/**
 * Create a project of userId
 * @param {Project} projectData 
 * @param {number} userId 
 * @returns {Promise<Project>}
 */
export async function createProject (projectData, userId) {
  const user = await getUserById(userId)
  try {
    return await user.addProject(projectData)
  } catch (error) {
    throw new InternalServerError({
      error,
      resource: RESOURCES.PROJECT,
      action: ACTIONS.CREATE,
    })
  }
}
