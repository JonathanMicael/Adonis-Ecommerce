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
 * Return User login now
 */

Route.get('v1/me', 'UserController.me')
  .as('me')
  .middleware('auth')

/**
 * Import Auth Routes
 */
require('./auth')

/**
 * Import Administrator Routes
 */
require('./admin')

/**
 * Import Client (public) Routes
 */
require('./client')
