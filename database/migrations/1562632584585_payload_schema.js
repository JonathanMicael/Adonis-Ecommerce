'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PayloadSchema extends Schema {
  up() {
    this.create('payloads', table => {
      table.increments()
      table.integer('user_id').unsigned()
      table.integer('order_id').unsigned()
      table.integer('payload_method_id').unsigned()
      table.string('ip', 100)
      table
        .enu('status', ['awaiting', 'aproved', 'refused'])
        .defaultTo('awaiting')

      table
        .string('currency', 10)
        .notNullable()
        .defaultTo('BRL')

      table.decimal('amount', 12, 2)
      table.json('details') // Cartão de Crédito, email, id da transação
      table.timestamps()

      // Foreign Keys
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('cascade')
      table
        .foreign('order_id')
        .references('id')
        .inTable('orders')
        .onDelete('cascade')
      table
        .foreign('payload_method_id')
        .references('id')
        .inTable('payload_methods')
        .onDelete('cascade')
    })
  }

  down() {
    this.drop('payloads')
  }
}

module.exports = PayloadSchema
