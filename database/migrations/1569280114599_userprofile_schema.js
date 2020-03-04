'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')

class UserprofileSchema extends Schema {
  up () {
    this.create('userprofiles', (table) => {
      table.increments()
      table.string('first_name')
      table.string('last_name')

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
    Database.raw('DROP TABLE IF EXISTS userprofiles CASCADE')
  }
}

module.exports = UserprofileSchema
