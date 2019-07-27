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
 * Roteamento auth
 */

Route.group(() => {
  Route.post('register', 'AuthController.register')
    .as('Auth.register')
    .middleware(['guest'])
    .validator('Auth/Register')

  Route.post('login', 'AuthController.login')
    .as('Auth.login')
    .middleware(['guest'])
    .validator('Auth/Login')

  Route.post('refresh', 'AuthController.refresh')
    .as('Auth.refresh')
    .middleware(['guest'])

  Route.post('logout', 'AuthController.logout')
    .as('Auth.logout')
    .middleware(['auth'])

  /**
   * Restore password routes
   */
  Route.post('password-reset', 'AuthController.forgot')
    .as('Auth.forgot')
    .middleware(['guest'])

  Route.get('password-reset', 'AuthController.remember')
    .as('Auth.remember')
    .middleware(['guest'])

  Route.put('password-reset', 'AuthController.reset')
    .as('Auth.reset')
    .middleware(['guest'])
})
  .prefix('v1/auth')
  .namespace('Auth')
