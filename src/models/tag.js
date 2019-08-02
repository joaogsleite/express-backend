import Sequelize, { Model } from 'sequelize'

import Post from './post'

export default class Tag extends Model {
  static init (sequelize) {
    const schema = {
      name: Sequelize.STRING,
    }
    const options = { tableName: 'tags', sequelize }
    super.init(schema, options)
  }
  static getById (id) {
    const where = { id }
    return Tag.findOne({ where })
  }
  static associate () {
    const options = {
      through: 'tagpost',
      foreignKey: 'tagId',
      otherKey: 'postId',
    }
    Tag.belongsToMany(Post, options)
  }
  
  toJSON() {
    return {
      id: this.id,
      name: this.title,
    }
  }
}
