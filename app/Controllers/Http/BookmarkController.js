'use strict'
const Boom = require('@hapi/boom')
const Bookmark = use('App/Models/Bookmark')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with bookmarks
 */
class BookmarkController {
  /**
   * Create/save a new bookmark.
   * POST bookmarks
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Response} ctx.response
   */
  async store({ params, response }) {
    try {
      const { users_id: userId, dishes_id: dishId } = params
      const bookmark = await Bookmark.create({ dishId, userId })
      return response
        .status(201)
        .json({ data: bookmark })
    } catch (e) {
      return Boom.boomify(e)
    }
  }

  /**
   * Delete a bookmark with id.
   * DELETE bookmarks
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    try {
      const { users_id: userId, dishes_id: dishId } = params
      await Bookmark
        .query()
        .where({ dishId, userId })
        .delete()
      return response
        .status(204)
    } catch (e) {
      return Boom.boomify(e)
    }
  }
}

module.exports = BookmarkController
