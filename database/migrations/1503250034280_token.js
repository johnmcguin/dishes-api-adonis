'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')

class TokensSchema extends Schema {
  up () {
    this.create('tokens', (table) => {
      table.increments()
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table
        .string('token', 255)
        .notNullable()
        .unique()
        .index()
      table
        .string('type', 80)
        .notNullable()
      table
        .boolean('is_revoked')
        .defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    Database.raw('DROP TABLE IF EXISTS tokens CASCADE')
  }
}

module.exports = TokensSchema
