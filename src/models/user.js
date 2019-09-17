import Sequelize, { Model } from 'sequelize'

import Post from './post'
import Role from './role'

export default class User extends Model {
  static init (sequelize) {
    const schema = {
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
    }
    const options = { tableName: 'users', sequelize }
    super.init(schema, options)
  }
  static associate () {
    User.hasMany(Post, {
      sourceKey: 'id',
      foreignKey: 'ownerId',
      as: 'posts',
    })
    User.belongsToMany(Role, {
      through: 'userrole',
      foreignKey: 'userId',
      otherKey: 'roleId',
      as: 'roles',
    })
  }

  static getById (id) {
    const where = { id }
    return User.findOne({ where })
  }

  toJSON() {
    const obj = {
      id: this.id,
      name: this.name,
      email: this.email,
    }
    if (Array.isArray(this.roles)) {
      obj.roles = this.roles.map((role) => {
        return role.toJSON()
      })
    }
    return obj
  }
}
