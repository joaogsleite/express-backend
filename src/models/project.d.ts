import { 
  Instance,
  Model,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
} from 'sequelize'

import { User } from './user'

declare class Project extends Model {
  public id!: number
  public ownerId!: number
  public name!: String

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public static getById(id: number): Promise<Project>
}

export default Project
