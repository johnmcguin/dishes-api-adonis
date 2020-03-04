'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')
const UserProfile = use('App/Models/UserProfile');

class User extends Model {
  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })

    this.addHook('afterCreate', async (userInstance) => {
      let profile = new UserProfile()
      await userInstance.profile().save(profile)
    })
  }

  static get hidden() {
    return ['password']
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token', 'id', 'userId')
  }

  profile() {
    return this.hasOne('App/Models/UserProfile', 'id', 'userId')
  }

  dishes() {
    return this.hasMany('App/Models/Dish', 'id', 'userId')
  }

  favorites() {
    return this.belongsToMany('App/Models/Dish', 'userId', 'dishId')
      .pivotTable('favorites')
  }

  bookmarks() {
    return this.belongsToMany('App/Models/Dish', 'userId', 'dishId')
      .pivotTable('bookmarks')
  }

  // user is followed by these
  followers() {
    return this.belongsToMany('App/Models/User', 'followingId', 'followerId')
      .pivotTable('followers')
  }

  // user is following these
  following() {
    return this.belongsToMany('App/Models/User', 'followerId', 'followingId')
      .pivotTable('followers')
  }

  dishRatings() {
    return this.hasMany('App/Models/Rating', 'id', 'userId')
  }
}

module.exports = User
