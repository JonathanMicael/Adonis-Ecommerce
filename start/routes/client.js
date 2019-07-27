'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/**
 * Client Routes
 */
Route.group(() => {
  /**
   * Products Resource Routes
   */
  Route.get('products', 'ProductController.index').as('ClientProduct.index')
  Route.get('products/:id', 'ProductController.show').as('ClientProduct.show')

  /**
   * Orders Resource Routes
   */
  Route.get('orders', 'OrderController.index').as('ClientOrder.index')
  Route.get('orders/:id', 'OrderController.show').as('ClientOrder.show')
  Route.post('orders', 'OrderController.store').as('ClientOrder.store')
  Route.put('orders', 'OrderController.put').as('ClientOrder.put')
})
  .prefix('v1')
  .namespace('Client')
