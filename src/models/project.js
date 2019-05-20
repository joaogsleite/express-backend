import Sequelize, { Model } from 'sequelize'

export default class Project extends Model {
  static init (sequelize) {
    const schema = {
      name: Sequelize.STRING,
    }
    const options = { tableName: 'projects', sequelize }
    super.init(schema, options)
  }
  static getById (id) {
    const where = { id }
    return Project.findOne({ where })
  }
  
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      ownerId: this.ownerId,
    }
  }
}
