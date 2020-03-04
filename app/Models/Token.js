'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Token extends Model {
    static boot() {
        super.boot()
    }

    user() {
        this.belongsTo('App/Models/User', 'userId', 'id')
    }
}

module.exports = Token
