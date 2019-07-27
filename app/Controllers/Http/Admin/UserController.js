'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const User = use('App/Models/User')
const Transformer = use('App/Transformers/Admin/UserTransformer')

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Object} ctx.pagination
   * @param { TransformWith } ctx.transform
   *
   */
  async index({ request, response, pagination, transform }) {
    const { name } = request.only(['name'])
    const query = User.query()
    if (name) {
      query.where('name', 'LIKE', `%${name}%`)
      query.orWhere('lastName', 'LIKE', `%${name}%`)
      query.orWhere('email', 'LIKE', `%${name}%`)
    }
    var users = await query.paginate(pagination.page, pagination.limit)
    users = await transform.paginate(users, Transformer)
    return response.send(users)
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param { TransformWith } ctx.transform
   *
   */
  async store({ request, response, transform }) {
    try {
      const userData = request.only([
        'name',
        'lastName',
        'username',
        'email',
        'password',
        'country',
        'address',
        'birthday',
        'cpf',
        'image_id'
      ])
      var user = await User.create(userData)
      user = await transform.item(user, Transformer)
      return response.status(201).send(user)
    } catch (error) {
      return response
        .status(400)
        .send({ massage: 'Nao foi possivel criar o usuario' })
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param { TransformWith } ctx.transform
   */
  async show({ params: { id }, response, transform }) {
    var user = await User.findOrFail(id)
    user = await transform.item(user, Transformer)
    return response.send(user)
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param { TransformWith } ctx.transform
   *
   */
  async update({ params: { id }, request, response, transform }) {
    var user = await User.findOrFail(id)
    const userData = request.only([
      'name',
      'lastName',
      'username',
      'email',
      'password',
      'country',
      'address',
      'birthday',
      'cpf',
      'image_id'
    ])
    user.merge(userData)
    await user.save()
    user = await transform.item(user, Transformer)
    return response.send(user)
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const user = await User.findOrFail(id)
    try {
      await user.delete()
      return response.status(204).send()
    } catch (error) {
      return response
        .status(500)
        .send({ message: 'Nao foi possivel deletar esse usuario' })
    }
  }
}

module.exports = UserController
