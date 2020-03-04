'use strict'

/*
|--------------------------------------------------------------------------
| MeasurementSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Database = use('Database')

class MeasurementSeeder {
  async run() {
    try {
      for (const measurement of this.defaults()) {
        const { name, shorthand } = measurement
        await Database.raw(`
          INSERT INTO measurements (name, shorthand, created_at, updated_at)
          VALUES ('${name}', '${shorthand}', current_timestamp, current_timestamp)
          ON CONFLICT
          DO NOTHING
        `)
      }
    } catch (e) {
      console.log('Error From Measurement Seeder.', e.message)
      // console.log('Error From Measurement Seeder: ', e)
    }
  }

  defaults() {
    return [
      {
        name: 'teaspoon',
        shorthand: 'tsp'
      },
      {
        name: 'tablespoon',
        shorthand: 'tbsp'
      },
      {
        name: 'fluid ounce',
        shorthand: 'fl oz'
      },
      {
        name: 'cup',
        shorthand: 'c'
      },
      {
        name: 'pint',
        shorthand: 'pt'
      },
      {
        name: 'quart',
        shorthand: 'qt'
      },
      {
        name: 'gallon',
        shorthand: 'gl'
      },
      {
        name: 'milliliter',
        shorthand: 'ml'
      },
      {
        name: 'liter',
        shorthand: 'l'
      },
      {
        name: 'pount',
        shorthand: 'p'
      },
      {
        name: 'ounce',
        shorthand: 'oz'
      },
      {
        name: 'milligram',
        shorthand: 'mg'
      },
      {
        name: 'gram',
        shorthand: 'g'
      },
      {
        name: 'kilogram',
        shorthand: 'kg'
      }
    ]
  }
}

module.exports = MeasurementSeeder
