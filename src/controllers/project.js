import Project from 'models/project'
import User from 'models/user'

import { getUserById } from './user'

import { createHttpError } from 'utils/express/middlewares'
import { RESOURCES, ACTIONS } from 'utils/express/errors'


/**
 * Get projects by user
 * @param {number} userId 
 * @returns {Promise<[Project]>}
 */
export function getProjectsByUser (userId) {
  return User.getById(userId).then((user) => {
    return user.getProjects()
  }).catch(createHttpError({
    resouce: RESOURCES.PROJECT,
    action: ACTIONS.LIST,
    message: `Impossible to list projects from user with id=${userId}`,
  })).then((projects) => {
    return projects.map((project) => {
      return project.toJSON()
    })
  })
}

/**
 * Create a project of userId
 * @param {Project} projectData 
 * @param {number} userId 
 * @returns {Promise<Project>}
 */
export function createProject (projectData, userId) {
  return getUserById(userId).then((user) => {
    return user.addProject(projectData)
  }).catch(createHttpError({
    resource: RESOURCES.PROJECT,
    action: ACTIONS.CREATE,
  }))
}
