import Sequelize, { Model } from 'sequelize'

import Post from './post'

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
    const options = {
      sourceKey: 'id',
      foreignKey: 'ownerId',
      as: 'posts',
    }
    User.hasMany(Post, options)
  }

  static getById (id) {
    const where = { id }
    return User.findOne({ where })
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    }
  }
}
