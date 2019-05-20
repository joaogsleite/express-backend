// database instance
import database from 'setup/database'


// import models
import UserModel from './user'
import ProjectModel from './project'


// init models
UserModel.init(database)
ProjectModel.init(database)


// export models
export const User = UserModel
export const Project = ProjectModel


// associate models
UserModel.associate()
