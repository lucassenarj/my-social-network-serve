'use strict'

const Post = use('App/Models/Post')

class LikeController {/**
  * * Create/save a new like
   * POST likes
   */
  async store ({ params, auth, response }) {
    const post = await Post.findOrFail(params.id)

    await post.likes().create({user_id: auth.user.id, like: 1})

    return response.status(200).send({message: 'Post liked!'})
  }
}

module.exports = LikeController
