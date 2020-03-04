'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')

class RatingsSchema extends Schema {
  up () {
    this.create('ratings', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table
        .integer('dish_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('dishes')
        .onDelete('CASCADE')
      /**
       * need to figure a way to limit this to min:1 - max:4. If I can't validate this at the db level via knex,
       * explore another validation layer perhaps
       */
      table.integer('rating')
      table.timestamps()
    })
  }

  down () {
    Database.raw('DROP TABLE IF EXISTS ratings CASCADE')
  }
}

module.exports = RatingsSchema
