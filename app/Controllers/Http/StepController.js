'use strict'

const Boom =  require('@hapi/boom')
const Step = use('App/Models/Step')

class StepController {
    async index({ params, response }) {
        try {
            const dishId = params.dishes_id
            const steps = await Step
                .query()
                .where({ dishId })
                .fetch()
            return response.json({ data: steps })
        } catch (e) {
            return Boom.boomify(e)
        }
    }

    async store({ params, request, response }) {
        try {
            const dishId = params.dishes_id
            const { stepNumber, instruction } = request.post()
            let step = Object.assign({}, { stepNumber, instruction, dishId })
            const newStep = await Step.create(step)
            return response
                .status(201)
                .json({ data: newStep })
        } catch (e) {
            return Boom.boomify(e)
        }
    }

    async update({ params, request, response }) {
        try {
            const id = params.id
            const { instruction } = request.post()
            let step = await Step.find(id)
            step.merge({ instruction })
            await step.save()
            return response.json({ data: step })
        } catch (e) {
            return Boom.boomify(e)
        }
    }

    async destroy({ params, response }) {
        try {
            const { id } = params
            await Step
                .query()
                .where({ id })
                .delete()
            return response.status(204)
        } catch (e) {
            return Boom.boomify(e)
        }
    }
}

module.exports = StepController
