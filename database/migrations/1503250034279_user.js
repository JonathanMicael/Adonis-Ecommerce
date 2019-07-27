'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', table => {
      table.increments()
      table.string('name', 200).notNullable()
      table.string('lastName', 200).notNullable()
      table
        .string('username', 80)
        .notNullable()
        .unique()
      table
        .string('email', 254)
        .notNullable()
        .unique()
      table.string('password', 60).notNullable()
      table.string('country').notNullable()
      table.string('address').notNullable()
      table.string('birthday').notNullable()
      table
        .string('cpf', 15)
        .notNullable()
        .unique()
      table.integer('image_id').unsigned()
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
