'use strict'
const Boom =  require('@hapi/boom')
const UserProfile = use('App/Models/UserProfile')
const Drive = use('Drive')
const ImageService = use('App/ImageProvider')

class UserProfileController {
    async update({ params, request, response }) {
        try {
            const { id: profileId } = params
            const { firstName, lastName } = request.post()
            let profile = await UserProfile.find(profileId)
            profile.merge({ firstName, lastName })
            await profile.save()
            const imgFile = request.file('avatar', { types: ['image'], size: '2mb' })
            if (imgFile) {
                const avatarBuffer = await ImageService.avatarize(imgFile.tmpPath)
                await Drive.put(`avatars/profile-${profile.id}-image`, avatarBuffer)
            }
            return response
                .status(200)
                .json({ data: profile })
        } catch (e) {
            return Boom.boomify(e)
        }
    }

    async show({ params, response }) {
        try {
            const { id: profileId } = params
            const profile = await UserProfile.find(profileId)
            return response
                .status(200)
                .json({ data: profile })
        } catch (e) {
            return Boom.boomify(e)
        }
    }
}

module.exports = UserProfileController
