'use strict'

const Route = use('Route')

Route.post('/users', 'UserController.create')
Route.post('/login', 'SessionController.create')
Route.resource('posts', 'PostController').apiOnly().middleware('auth')