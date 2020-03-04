'use strict'
const Boom = require('@hapi/boom')
const Drive = use('Drive')
const Dish = use('App/Models/Dish')

class UserDishController {
    async index({ auth, response }) {
        try {
            const user = await auth.getUser()
            const userDishes = await Dish.query().where({ userId: user.id }).fetch()
            const res = userDishes.toJSON()
            for (const dish of res) {
                const dishImgExists = await Drive.exists(`dishes/dish-${dish.id}-image`)
                if (dishImgExists) dish.imgUrl = await Drive.disk('s3').getSignedUrl(`dishes/dish-${dish.id}-image`, 604800)
            }

            return response
                .status(200)
                .json({ data: res })
        } catch (e) {
            return Boom.boomify(e)
        }
    }
}

module.exports = UserDishController
