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

// Client Blueprint
Factory.blueprint('App/Models/User', faker => {
  return {
    name: faker.first(),
    lastName: faker.last(),
    username: faker.last({ nationality: 'it' }),
    email: faker.email({ domain: 'example.com' }),
    cpf: faker.cpf(),
    birthday: faker.birthday({ string: true }),
    address: faker.address(),
    country: faker.country({ full: true }),
    password: 'secret'
  }
})
Factory.blueprint('App/Models/Category', faker => {
  return {
    title: faker.country({ full: true }),
    description: faker.sentence()
  }
})

Factory.blueprint('App/Models/Product', faker => {
  return {
    name: faker.animal(),
    description: faker.sentence(),
    price: faker.floating({ min: 0, max: 1000, fixed: 2 })
  }
})
