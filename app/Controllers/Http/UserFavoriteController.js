'use strict'
const Boom = require('@hapi/boom')
const User = use('App/Models/User')

class UserFavoriteController {
    async index({ params, response }) {
        try {
            const { users_id: userId } = params
            const user = await User.find(userId)
            const favoriteData = await user
                .favorites()
                .fetch()
            const favorites = favoriteData.toJSON()
            return response
                .status(201)
                .json({ data: favorites })
        } catch (e) {
            return Boom.boomify(e)
        }
    }
}

module.exports = UserFavoriteController
