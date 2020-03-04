'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')

class DishSchema extends Schema {
  up () {
    this.create('dishes', (table) => {
      table.increments()

      table
        .string('title')
        .notNullable()

      table.string('description')

      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.timestamps()

    })
  }

  down () {
    Database.raw('DROP TABLE IF EXISTS dishes CASCADE')
  }
}

module.exports = DishSchema
