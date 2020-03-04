'use strict'
const Ingredient = use('App/Models/Ingredient')
const Boom =  require('@hapi/boom')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with ingredients
 */
class IngredientController {
  /**
   * Show a list of all ingredients.
   * GET ingredients
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ params, response }) {
    try {
      const ingredients = await Ingredient
        .query()
        .where({ dishId: params.dishes_id })
        .fetch()
      return response
        .status(200)
        .json({ data: ingredients })
    } catch (e) {
      return Boom.boomify(e)
    }
  }

  /**
   * Create/save a new ingredient.
   * POST ingredients
   *
   * @param {object} ctx
   * @param {Params} cts.params
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ params, request, response }) {
    // create new ingredient (for dish)
    try {
      const dishId = params.dishes_id
      const { measurementId, name, quantity } = request.post()
      const ingredient = await Ingredient.create({
        measurementId,
        dishId,
        name,
        quantity
      })
      return response
        .status(201)
        .json({ data: ingredient })
    } catch (e) {
      return Boom.boomify(e)
    }
  }

  /**
   * Display a single ingredient.
   * GET ingredients/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show({ params, response }) {
    try {
      const ingredient = await Ingredient.find(params.id)
      return response
        .status(200)
        .json({ data: ingredient })
    } catch (e) {
      return Boom.boomify(e)
    }
  }

  /**
   * Update ingredient details.
   * PUT or PATCH ingredients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const ingredient = await Ingredient.find(params.id)
    ingredient.merge(request.post())
    await ingredient.save()
    return response
      .status(200)
      .json({ data: ingredient })
  }

  /**
   * Delete a ingredient with id.
   * DELETE ingredients/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    try {
      const { id } = params
      await Ingredient
        .query()
        .where({ id })
        .delete()
      return response.status(204)
    } catch (e) {
      return Boom.boomify(e)
    }
  }
}

module.exports = IngredientController
