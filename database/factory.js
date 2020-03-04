'use strict'
/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
// faker (chance js) documentation: https://chancejs.com/basics/integer.html
// Factory.blueprint('App/Models/Measurement', async () => {
//     return { }
// })