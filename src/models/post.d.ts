import Sequelize, {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  Instance
} from "sequelize";

import { User } from "./user";

declare class Post extends Model {
  public id!: number;
  public ownerId!: number;
  public title!: String;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static getById(id: number): Promise<Post>;

  public getUser: BelongsToGetAssociationMixin<User>;
  public setUser: BelongsToSetAssociationMixin<User, User["id"]>;
  public createUser: BelongsToCreateAssociationMixin<User, User>;
}

export default Post;
