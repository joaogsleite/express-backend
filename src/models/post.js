import Sequelize, { Model } from 'sequelize'

import Tag from './tag'

export default class Post extends Model {
  static init (sequelize) {
    const schema = {
      title: Sequelize.STRING,
    }
    const options = { tableName: 'posts', sequelize }
    super.init(schema, options)
  }
  static getById (id) {
    const where = { id }
    return Post.findOne({ where })
  }
  static associate () {
    const options = {
      through: 'tagpost',
      foreignKey: 'postId',
      otherKey: 'tagId',
    }
    Post.belongsToMany(Tag, options)
  }
  
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      ownerId: this.ownerId,
    }
  }
}
