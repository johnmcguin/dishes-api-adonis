'use strict'
const Boom = require('@hapi/boom')
const User = use('App/Models/User')
const Drive = use('Drive')

class UserController {
    async index({ response }) {
        try {
            const data = await User
                .query()
                .with('profile')
                .fetch()
            const users = data.toJSON()
            for (const user of users) {
                const profileExists = await Drive.exists(`avatars/profile-${user.userProfileId}-image`)
                if (profileExists) user.userProfileImg = await Drive.disk('s3').getSignedUrl(`avatars/profile-${user.userProfileId}-image`, 604800)
            }
            return response.json({ data: users })
        } catch (e) {
            return Boom.boomify(e)
        }
    }
}

module.exports = UserController
