import Sequelize, {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
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

import { User } from './user'
import { Tag } from './tag'

declare class Post extends Model {
  public id!: number
  public ownerId!: number
  public title!: String

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public static getById(id: number): Promise<Post>

  public getUser: BelongsToGetAssociationMixin<User>;
  public setUser: BelongsToSetAssociationMixin<User, User['id']>;
  public createUser: BelongsToCreateAssociationMixin<User, User>;

  public getTags!: BelonTagToManyGetAssociationsMixin<Tag>;
  public setTags!: BelonTagToManySetAssociationsMixin<Tag, Tag['id'], 'tagpost'>;
  public addTag!: BelonTagToManyAddAssociationMixin<Tag, Tag['id'], 'tagpost'>;
  public addTags!: BelonTagToManyAddAssociationsMixin<Tag, Tag['id'], 'tagpost'>;
  public createTag!: BelonTagToManyCreateAssociationMixin<Tag, Tag['id'], 'tagpost'>;
  public removeTag!: BelonTagToManyRemoveAssociationMixin<Tag, Tag['id']>;
  public removeTags!: BelonTagToManyRemoveAssociationsMixin<Tag, Tag['id']>;
  public hasTag!: BelonTagToManyHasAssociationMixin<Tag, Tag['id']>;
  public hasTags!: BelonTagToManyHasAssociationsMixin<Tag, Tag['id']>;
  public countTags!: BelonTagToManyCountAssociationsMixin;
}

export default Post
