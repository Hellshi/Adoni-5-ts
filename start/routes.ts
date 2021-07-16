/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('/user', 'UsersController.store')
Route.post('/logIn', 'UsersController.session')

Route.group(() => {
  Route.post('/', 'ResetPasswordsController.store')
  Route.post('/:token', 'ResetPasswordsController.update')
}).prefix('/reset')

Route.group(() => {
  Route.get('/', 'UsersController.index')

  Route.group(() => {
    Route.get('/:id', 'ProjectsController.show')
    Route.post('/create', 'ProjectsController.store')
    Route.delete('/delete/:id', 'ProjectsController.delete')
    Route.put('/update/:id', 'ProjectsController.update')
  }).prefix('/project')
}).middleware('auth')

Route.group(() => {
  Route.group(() => {
    Route.get('/:Task_id', 'TasksController.show')
    Route.post('create', 'TasksController.store')
    Route.delete('/delete/:Task_id', 'TasksController.delete')
    Route.put('/update/:Task_id', 'TasksController.update')
  }).prefix('/projects/:Project_id/tasks')

  Route.group(() => {
    Route.post('/', 'FilesController.store')
    Route.get('/:id', 'FilesController.show')
  }).prefix('/file')
}).middleware('auth')
