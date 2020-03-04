'use strict'
const Boom = require('@hapi/boom')
const Dish = use('App/Models/Dish')
const Drive = use('Drive')
const ImageService = use('App/ImageProvider')

class DishController {
    async index({ response }) {
        try {
            const dishes = await Dish
                .query()
                .with('steps')
                .fetch();
            return response.json({ data: dishes })
        } catch (e) {
            return Boom.boomify(e)
        }
    }

    async store({ request, response, auth }) {
        try {
            const { title, description, steps } = request.post()
            const user = await auth.getUser()
            let dish = Object.assign({}, { title, description, userId: user.id })
            const newDish = await Dish.create(dish)
            if (steps) {
                await newDish.steps().createMany(steps)
            }
            const imgFile = request.file('dishImage', { types: ['image'] })
            // clean this up
            if (imgFile) {
                const dishImgBuffer = await ImageService.dishify(imgFile.tmpPath)
                // imgFile.clientName to access original filename
                await Drive.put(`dishes/dish-${newDish.id}-image`, dishImgBuffer)
            }
            const results = await Dish
                .query()
                .where('id', newDish.id)
                .with('steps')
                .fetch()
            return response
                .status(201)
                .json({ data: results })
        } catch (e) {
            return Boom.boomify(e)
        }
    }

    async update({ request, params, response }) {
        try {
            const id = params.id
            const { title, description } = request.post()
            let dish = await Dish.find(id)
            dish.title = title || dish.title
            dish.description = description || dish.description
            await dish.save()
            const imgFile = request.file('dishImage', { types: ['image'] })
            if (imgFile) {
                const dishImgBuffer = await ImageService.dishify(imgFile.tmpPath)
                await Drive.put(`dishes/dish-${dish.id}-image`, dishImgBuffer)
            }
            return response
                .status(200)
                .json({ data: dish })
        } catch (e) {
            return Boom.boomify(e)
        }
    }

    async show({ params, response }) {
        try {
            const id = params.id
            const dishSerializer = await Dish
                .query()
                .with('steps', (builder) => {
                    builder.orderBy('stepNumber', 'asc')
                })
                .where('id', id)
                .with('ingredients', (builder) => {
                    builder.with('')
                })
                .where('id', id)
                .fetch()

            const dishJSON = dishSerializer.toJSON()
            const dish = dishJSON[0]
            const dishImgExists = await Drive.exists(`dishes/dish-${dish.id}-image`)
            if (dishImgExists) dish.imgUrl = await Drive.disk('s3').getSignedUrl(`dishes/dish-${dish.id}-image`, 604800)
            return response
                .status(200)
                .json({ data: dish })
        } catch (e) {
            return Boom.boomify(e)
        }
    }
}

module.exports = DishController
