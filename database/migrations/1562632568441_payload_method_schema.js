'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PayloadMethodSchema extends Schema {
  up() {
    this.create('payload_methods', table => {
      table.increments()
      table.string('name', 100).unique()
      table.string('slug', 120).unique()
    })
  }

  down() {
    this.drop('payload_methods')
  }
}

module.exports = PayloadMethodSchema
