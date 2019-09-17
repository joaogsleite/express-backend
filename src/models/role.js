import Sequelize, { Model } from 'sequelize'

import User from './user'

export default class Role extends Model {
  static init (sequelize) {
    const schema = {
      name: Sequelize.STRING,
    }
    const options = { tableName: 'roles', sequelize }
    super.init(schema, options)
  }
  static associate () {
    const options = {
      through: 'userrole',
      foreignKey: 'roleId',
      otherKey: 'userId',
    }
    Role.belongsToMany(User, options)    
  }

  static getById (id) {
    const where = { id }
    return User.findOne({ where })
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
    }
  }
}
