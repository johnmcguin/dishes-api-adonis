'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')

class FollowersSchema extends Schema {
  up () {
    this.create('followers', (table) => {
      table.increments()
      table
        .integer('follower_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table
        .integer('following_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    Database.raw('DROP TABLE IF EXISTS followers CASCADE')
  }
}

module.exports = FollowersSchema
