'use strict'
const Boom = require('@hapi/boom')
const Follower = use('App/Models/Follower')
const Database = use('Database')

class FollowController {
    async store({ params, request, response }) {
        try {
            const { users_id: followerId } = params
            const { followingId } = request.post()
            const follower = await Follower.create({ followerId, followingId })
            return response
                .status(201)
                .json({ data: follower })
        } catch (e) {
            return Boom.boomify(e)
        }
    }

    async destroy({ params, response }) {
        try {
            const { users_id: followerId, id: followingId } = params
            await Follower
                .query()
                .where({ followerId, followingId })
                .delete()

            return response
                .status(204)
                .json({
                    data: null,
                    message: `Successfully deleted follower record for user ${id} following user ${followId}`
                })
        } catch (e) {
            return Boom.boomify(e)
        }
    }
}

module.exports = FollowController
