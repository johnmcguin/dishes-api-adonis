'use strict'
const Boom =  require('@hapi/boom')
const User = use('App/Models/User')
const Event = use('Event')

class AuthController {
  async register({ request, auth, response }) {
    try {
      const { username, email, password } = request.body
      let user = new User()
      user.username = username
      user.email = email
      user.password = password
      await user.save()
      Event.fire('new::user', user.toJSON())
      let accessToken = await auth.generate(user)
      return response.json({ data: { user, accessToken } })
    } catch (e) {
      return Boom.boomify(e)
    }
  }

  async login({ request, auth, response }) {
    try {
      const { email, password } = request.body
      const isUser = await auth.attempt(email, password)

      if (isUser) {
        let user = await User.findBy('email', email)
        let accessToken = await auth.generate(user)
        return response.json({ data: { user, accessToken } })
      }
      return Boom.badRequest('invalid login credentials.')
    } catch (e) {
      return Boom.boomify(e)
    }
  }
}

module.exports = AuthController;
