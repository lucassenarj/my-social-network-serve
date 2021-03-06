'use strict'

const Model = use('Model')

class Post extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  likes () {
    return this.hasMany('App/Models/Like')
  }
}

module.exports = Post
