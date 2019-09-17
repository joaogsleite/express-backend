import { 
  Instance,
  Model,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToManyAddAssociationMixinn,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
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

  public getRoles!: BelongsToManyGetAssociationsMixin<Role>;
  public setRoles!: BelongsToManySetAssociationsMixin<Role, Role['id'], 'Roletag'>;
  public addRole!: BelongsToManyAddAssociationMixin<Role, Role['id'], 'Roletag'>;
  public addRoles!: BelongsToManyAddAssociationsMixin<Role, Role['id'], 'Roletag'>;
  public createRole!: BelongsToManyCreateAssociationMixin<Role, Role['id'], 'Roletag'>;
  public removeRole!: BelongsToManyRemoveAssociationMixin<Role, Role['id']>;
  public removeRoles!: BelongsToManyRemoveAssociationsMixin<Role, Role['id']>;
  public hasRole!: BelongsToManyHasAssociationMixin<Role, Role['id']>;
  public hasRoles!: BelongsToManyHasAssociationsMixin<Role, Role['id']>;
  public countRoles!: BelongsToManyCountAssociationsMixin;

  public readonly posts?: Post[]
  public readonly roles?: Role[]

  public static associations: {
    posts: Association<User, Post>,
    roles: Association<User, Post>,
  }
}

export default User
