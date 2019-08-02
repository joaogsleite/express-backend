import { 
  Instance,
  Model,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
} from 'sequelize'

import { Post } from './post'

declare class User extends Model {
  public id!: number
  public name!: String
  public email!: String
  public password!: String

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static getById(id: number): Promise<User>

  public getPosts!: HasManyGetAssociationsMixin<Post>
  public addPost!: HasManyAddAssociationMixin<Post, number>
  public hasPost!: HasManyHasAssociationMixin<Post, number>
  public countPosts!: HasManyCountAssociationsMixin
  public createPost!: HasManyCreateAssociationMixin<Post>

  public readonly posts?: Post[]

  public static associations: {
    posts: Association<User, Post>
  }
}

export default User
