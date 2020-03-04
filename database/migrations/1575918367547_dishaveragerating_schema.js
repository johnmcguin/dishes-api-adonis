'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')
class DishaverageratingSchema extends Schema {
  async up () {
    await Database.raw('CREATE VIEW dish_average_ratings AS SELECT "dishes".*, avg("rating") AS "average_rating" FROM "dishes" LEFT JOIN "ratings" ON "ratings"."dish_id" = "dishes"."id" GROUP BY "dishes"."id"')
  }

  down () {
    Database.raw('DROP VIEW IF EXISTS dish_average_ratings CASCADE')
  }
}

module.exports = DishaverageratingSchema
