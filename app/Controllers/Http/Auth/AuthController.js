'use strict'

const User = use('App/Models/User')
const Role = use('Role')
const Database = use('Database')

class AuthController {
  async register({ request, response }) {
    const trx = await Database.beginTransaction()
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
      const user = await User.create(userData, trx)
      const userRole = await Role.findBy('slug', 'client')
      await user.roles().attach([userRole.id], null, trx)
      await trx.commit()
      const topic = Ws.getChannel('notifications').topic('notifications')
      if (topic) {
        topic.broadcast('new:user')
      }
      return response.status(201).send({ data: user })
    } catch (error) {
      await trx.rollback()
      return response.status(400).send({
        message: 'Erro ao realizar o cadastro!'
      })
    }
  }
  async login({ request, response, auth }) {
    const { email, password } = request.all()
    let data = await auth.withRefreshToken().attempt(email, password)
    return response.send({ data })
  }
  async refresh({ request, response, auth }) {
    const refresh_token = request.input('refresh_token')
    if (!refresh_token) {
      refresh_token = request.header('refresh_token')
    }
    const user = await auth
      .newRefreshToken()
      .generateForRefreshToken(refresh_token)
    return response.send({ data: user })
  }
  async logout({ request, response, auth }) {
    const refresh_token = request.input('refresh_token')
    if (!refresh_token) {
      refresh_token = request.header('refresh_token')
    }
    await auth.authenticator('jwt').revokeTokens([refresh_token], true)
    return response.status(200).send()
  }
  async forgot({ request, response }) {
    //
  }
  async remember({ request, response }) {
    //
  }
  async reset({ request, response }) {
    //Users
  }
}

module.exports = AuthController
