'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')

class MeasurementsSchema extends Schema {
  up () {
    this.create('measurements', (table) => {
      table.increments()
      table.timestamps()
      table.string('name').notNullable().unique()
      table.string('shorthand')
    })
  }

  down () {
    Database.raw('DROP TABLE IF EXISTS measurements CASCADE')
  }
}

module.exports = MeasurementsSchema
