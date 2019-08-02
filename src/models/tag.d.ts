import Sequelize, {
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  Instance
} from 'sequelize'

import { Post } from './post'

declare class Tag extends Model {
  public id!: number
  public name!: String

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public static getById(id: number): Promise<Tag>

  public getPosts!: BelonPostToManyGetAssociationsMixin<Post>;
  public setPosts!: BelonPostToManySetAssociationsMixin<Post, Post['id'], 'tagpost'>;
  public addPost!: BelonPostToManyAddAssociationMixin<Post, Post['id'], 'tagpost'>;
  public addPosts!: BelonPostToManyAddAssociationsMixin<Post, Post['id'], 'tagpost'>;
  public createPost!: BelonPostToManyCreateAssociationMixin<Post, Post['id'], 'tagpost'>;
  public removePost!: BelonPostToManyRemoveAssociationMixin<Post, Post['id']>;
  public removePosts!: BelonPostToManyRemoveAssociationsMixin<Post, Post['id']>;
  public hasPost!: BelonPostToManyHasAssociationMixin<Post, Post['id']>;
  public hasPosts!: BelonPostToManyHasAssociationsMixin<Post, Post['id']>;
  public countPosts!: BelonPostToManyCountAssociationsMixin;


}

export default Tag
