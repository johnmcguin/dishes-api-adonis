"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Dish extends Model {
  static boot() {
    super.boot()
  }

  steps() {
    /**
     * This was the missing piece for using Lucid model relationships
     * with knexSnakeCaseMappers. That utility allows a clean implementation
     * for writing Node in camelCase and keeping the snake_case convention
     * at the data layer. However, the major gotcha is that you must override 
     * these model relationship arguments for primaryKey and foreignKey as 
     * per objection documentation: 
     * https://vincit.github.io/objection.js/recipes/snake-case-to-camel-case-conversion.html
     * 
     * As per AdonisJS docs, this relationship would default to 
     * this.hasMany('App/Models/Step', 'id', 'dish_id')
     * So, we need to override to camelCase:
     */
    return this.hasMany('App/Models/Step', 'id', 'dishId')
  }

  ratings() {
    return this.hasMany('App/Models/Rating', 'id', 'dishId')
  }

  user() {
    return this.belongsTo('App/Models/User', 'userId', 'id')
  }

  bookmarks() {
    return this.hasMany('App/Models/Bookmark', 'id', 'dishId')
  }

  ingredients() {
    return this.hasMany('App/Models/Ingredient', 'id', 'dishId')
  }
}

module.exports = Dish;
