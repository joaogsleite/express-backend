// database instance
import database from 'setup/mysql';


// import models
import logger from 'utils/logger';
import UserModel from './user';
import PostModel from './post';
import RoleModel from './role';

// logger
const log = logger('models');


// init models
log('init start');
UserModel.init(database);
PostModel.init(database);
RoleModel.init(database);
log('init end');


// export models
export const User = UserModel;
export const Post = PostModel;
export const Role = RoleModel;


// associate models
log('associate start');
UserModel.associate();
PostModel.associate();
RoleModel.associate();
log('associate end');
