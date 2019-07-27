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
 * Roteamento admin
 */
Route.group(() => {
  /**
   * Catergories Resource Admin
   */
  Route.resource('categories', 'CategoryController')
    .apiOnly()
    .validator(
      new Map([
        [['categories.store'], ['Admin/StoreCategory']],
        [['categories.update'], ['Admin/StoreCategory']]
      ])
    )
  /**
   * Products Resource Admin
   */
  Route.resource('products', 'ProductController').apiOnly()
  /**
   * Coupons Resource Admin
   */
  Route.resource('coupons', 'CouponController').apiOnly()
  /**
   * Order Resource Admin
   */
  Route.post('orders/:id/discount', 'OrderController.applyDiscount')
  Route.delete('orders/:id/discount', 'OrderController.removeDiscount')
  Route.resource('orders', 'OrderController')
    .apiOnly()
    .validator(new Map([[['orders.store'], ['Admin/StoreOrder']]]))
  /**
   * Images Resource Admin
   */
  Route.resource('images', 'ImageController').apiOnly()
  /**
   * Users Resource Admin
   */
  Route.resource('users', 'UserController')
    .apiOnly()
    .validator(
      new Map([
        [['users.store'], ['Admin/StoreUser']],
        [['users.update'], ['Admin/StoreUser']]
      ])
    )
  /**
   * Dashboard Routes Admin
   */
  Route.get('dashboard', 'DashboardController.index').as('dashboard')
})
  .prefix('v1/admin')
  .namespace('Admin')
  .middleware(['auth', 'is:( admin || manager )'])
