// database instance
import database from 'setup/mysql'


// import models
import UserModel from './user'
import ProjectModel from './project'

// logger
import logger from 'utils/logger'
const log = logger('models')


// init models
log('init start')
UserModel.init(database)
ProjectModel.init(database)
log('init end')


// export models
export const User = UserModel
export const Project = ProjectModel


// associate models
log('associate start')
UserModel.associate()
log('associate end')
