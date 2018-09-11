'use strict'

const Post = use('App/Models/Post')

/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   */
  async index () {
    const post =  await Post.query().where('status', 1).fetch()

    return post
  }

  /**
   * Create/save a new post.
   * POST posts
   */
  async store ({ auth, request, response }) {
    const { id } = auth.user

    const data = request.only([
      "title",
      "text"
    ])

    const post = await Post.create({...data, status: 1, user_id: id})

    return post
  }

  /**
   * Display a single post.
   * GET posts/:id
   */
  async show ({ params }) {
    const post = await Post.findOrFail(params.id)

    await post.load('likes')

    return post
  }

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   */
  async update ({ params, request, response }) {
    const post = await Post.findOrFail(params.id)

    const data = request.only([
      "title",
      "text",
      "status"
    ])

    post.merge(data)

    await post.save()

    return post

  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   */
  async destroy ({ params, auth, response }) {
    const post = await Post.findOrFail(params.id)

    if (post.user_id !== auth.user.id) {
      return response.status(401).send({error: 'Not authorized'})
    }

    post.merge({'status': 0})

    await post.save()

    return response.status(200).send({message: 'Post deleted'})
  }
}

module.exports = PostController
