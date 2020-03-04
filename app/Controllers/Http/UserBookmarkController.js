'use strict'
const Boom = require('@hapi/boom')
const User = use('App/Models/User')


class UserBookmarkController {
    async index({ params, response }) {
        try {
            const { users_id: userId } = params
            const user = await User.find(userId)
            const bookmarkData = await user
                .bookmarks()
                .fetch()
            const bookmarks = bookmarkData.toJSON()
            
            return response
                .status(201)
                .json({ data: bookmarks })
        } catch (e) {
            return Boom.boomify(e)
        }
    }
}

module.exports = UserBookmarkController
