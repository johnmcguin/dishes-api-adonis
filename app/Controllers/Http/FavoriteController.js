'use strict'
const Boom = require('@hapi/boom')
const Favorite = use('App/Models/Favorite')

class FavoriteController {
    async store({ params, response }) {
        try {
            const { users_id: userId, dishes_id: dishId } = params
            const fave = await Favorite.create({ dishId, userId })
            return response
                .status(201)
                .json({ data: fave })
        } catch (e) {
            return Boom.boomify(e)
        }
    }

    async destroy({ params, response }) {
        try {
            const { users_id: userId, dishes_id: dishId, id: favoriteId } = params
            await Favorite
                .query()
                .where({ dishId, userId, id: favoriteId })
                .delete()
            return response
                .status(204)
                .json({
                    data: null,
                    message: `Successfully deleted user favorite dish ${dishId}`
                })
        } catch (e) {
            return Boom.boomify(e)
        }
    }
}

module.exports = FavoriteController
