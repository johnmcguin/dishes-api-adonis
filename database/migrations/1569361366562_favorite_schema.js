'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')

class FavoriteSchema extends Schema {
  up () {
    // recipes (or, dishes) that have been favorited
    this.create('favorites', (table) => {
      table.increments()
      table
        .integer('dish_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('dishes')
        .onDelete('CASCADE')
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    Database.raw('DROP TABLE IF EXISTS favorites CASCADE')
  }
}

module.exports = FavoriteSchema
