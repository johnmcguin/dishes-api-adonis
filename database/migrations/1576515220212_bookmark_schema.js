'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')

class BookmarkSchema extends Schema {
  up () {
    this.create('bookmarks', (table) => {
      table.increments()
      table.timestamps()
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
    })
  }

  down () {
    Database.raw('DROP TABLE IF EXISTS bookmarks CASCADE')
  }
}

module.exports = BookmarkSchema
