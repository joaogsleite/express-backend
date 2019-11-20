import {
  Instance,
  Model,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin
} from "sequelize";

import { Post } from "./post";

declare class Role extends Model {
  public id!: number;
  public name!: String;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static getById(id: number): Promise<Role>;

  public getUsers!: BelongsToManyGetAssociationsMixin<User>;
  public setUsers!: BelongsToManySetAssociationsMixin<
    User,
    User["id"],
    "Usertag"
  >;
  public addUser!: BelongsToManyAddAssociationMixin<
    User,
    User["id"],
    "Usertag"
  >;
  public addUsers!: BelongsToManyAddAssociationsMixin<
    User,
    User["id"],
    "Usertag"
  >;
  public createUser!: BelongsToManyCreateAssociationMixin<
    User,
    User["id"],
    "Usertag"
  >;
  public removeUser!: BelongsToManyRemoveAssociationMixin<User, User["id"]>;
  public removeUsers!: BelongsToManyRemoveAssociationsMixin<User, User["id"]>;
  public hasUser!: BelongsToManyHasAssociationMixin<User, User["id"]>;
  public hasUsers!: BelongsToManyHasAssociationsMixin<User, User["id"]>;
  public countUsers!: BelongsToManyCountAssociationsMixin;

  public readonly users?: User[];

  public static associations: {
    users: Association<Role, User>;
  };
}

export default Role;
