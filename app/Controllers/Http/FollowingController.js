'use strict'
const Boom = require('@hapi/boom')
const Database = use('Database')
const User = use('App/Models/User')

class FollowingController {
    async index({ params, response }) {
        try {
            // get users that this user is following
            const { users_id: userId } = params
            const user = await User.find(userId)
            const followingData = await user
                .following()
                .with('profile')
                .fetch()

            const following = followingData.toJSON()
            return response.json({ data: following })
        } catch (e) {
            return Boom.boomify(e)
        }
    }
}

module.exports = FollowingController
