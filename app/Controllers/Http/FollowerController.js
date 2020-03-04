'use strict'
const Boom = require('@hapi/boom')
const User = use('App/Models/User')

class FollowerController {
    async index({ params, response }) {
        try {
            const { users_id: userId } = params
            const user = await User.find(userId)
            const followerData = await user
                .followers()
                .with('profile')
                .fetch()

            const followers = followerData.toJSON()
            return response.json({ data: followers })
            
        } catch (e) {
            return Boom.boomify(e)
        }
    }
}

module.exports = FollowerController
