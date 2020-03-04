'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IngredientsSchema extends Schema {
  up () {
    this.create('ingredients', (table) => {
      table.increments()
      table.timestamps()
      table.string('name').notNullable()
      table.float('quantity').notNullable() // quantity (of measurement)
      table
        .integer('dish_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('dishes')
        .onDelete('CASCADE')
      table
        .integer('measurement_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('measurements')
        .onDelete('CASCADE')
    })
  }

  down () {
    Database.raw('DROP TABLE IF EXISTS ingredients CASCADE')
  }
}

module.exports = IngredientsSchema
