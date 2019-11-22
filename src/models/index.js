
// import models
import logger from 'utils/logger';
import UserModel from './user';
import PostModel from './post';
import RoleModel from './role';

// logger
const log = logger('models');


// init models
export function initModels(database) {
  log('init start');
  UserModel.init(database);
  PostModel.init(database);
  RoleModel.init(database);
  log('init end');
}

// associate models
export function associateModels() {
  log('associate start');
  UserModel.associate();
  PostModel.associate();
  RoleModel.associate();
  log('associate end');
}


// export models
export const User = UserModel;
export const Post = PostModel;
export const Role = RoleModel;
