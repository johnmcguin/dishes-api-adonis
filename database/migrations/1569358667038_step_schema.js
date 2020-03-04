'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')

class StepSchema extends Schema {
  up () {
    this.create('steps', (table) => {
      table.increments()
      table
        .integer('step_number')
        .notNullable()
      table
        .string('instruction')
        .notNullable()
      table
        .integer('dish_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('dishes')
        .onDelete('CASCADE') // if a dish is deleted, delete the steps associated with it as well
      table.timestamps()
    })
  }

  down () {
    Database.raw('DROP TABLE IF EXISTS steps CASCADE')
  }
}

module.exports = StepSchema
