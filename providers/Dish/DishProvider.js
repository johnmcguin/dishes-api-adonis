'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const DishService = require('./')

class DishProvider extends ServiceProvider {
    /**
     * Register namespaces to the IoC container
     *
     * @method register
     *
     * @return {void}
     */
    register() {
        this.app.bind('App/DishProvider', (app) => {
            const Database = app.use('Database')
            return new DishService(Database)
        })
    }

    /**
     * Attach context getter when all providers have
     * been registered
     *
     * @method boot
     *
     * @return {void}
     */
    boot() {
        //
    }
}

module.exports = DishProvider
