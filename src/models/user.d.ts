import { 
  Instance,
  Model,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
} from 'sequelize'

import { Project } from './project'

declare class User extends Model {
  public id!: number
  public name!: String
  public email!: String
  public password!: String

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static getById(id: number): Promise<User>

  public getProjects!: HasManyGetAssociationsMixin<Project>
  public addProject!: HasManyAddAssociationMixin<Project, number>
  public hasProject!: HasManyHasAssociationMixin<Project, number>
  public countProjects!: HasManyCountAssociationsMixin
  public createProject!: HasManyCreateAssociationMixin<Project>

  public readonly projects?: Project[]

  public static associations: {
    projects: Association<User, Project>
  }
}

export default User
