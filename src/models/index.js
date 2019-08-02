// database instance
import database from 'setup/mysql'


// import models
import UserModel from './user'
import PostModel from './post'
import TagModel from './tag'

// logger
import logger from 'utils/logger'
const log = logger('models')


// init models
log('init start')
UserModel.init(database)
PostModel.init(database)
TagModel.init(database)
log('init end')


// export models
export const User = UserModel
export const Post = PostModel


// associate models
log('associate start')
UserModel.associate()
PostModel.associate()
TagModel.associate()
log('associate end')
