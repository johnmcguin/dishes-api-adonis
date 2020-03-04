'use strict'
const Boom =  require('@hapi/boom')
const Rating = use('App/Models/Rating')

class RatingController {
    async store({ auth, params, request, response }) {
        try {
            const dishId = params.dishes_id
            const { rating } = request.post()
            const user = await auth.getUser()
            const newRating = await Rating.create({
                dishId,
                userId: user.id,
                rating
            })
            return response
                .status(201)
                .json({ data: newRating })
        } catch (e) {
            return Boom.boomify(e)
        }
    }

    async update({ auth, params, request, response }) {
        try {
            const user = await auth.getUser()
            const { dishes_id: dishId, users_id: userId } = params
            if (user.id != userId) throw new Error(`Can not change another user's rating of a dish`)
            const { rating } = request.post()
            await Rating
                .query()
                .where({ dishId, userId })
                .update({ rating })
            return response.status(200)
        } catch (e) {
            return Boom.boomify(e)
        }
    }
}

module.exports = RatingController
