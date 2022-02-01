import Route from '@ioc:Adonis/Core/Route'

Route
  .group(() => {
    Route.post('/register', 'AuthController.register')
    Route.post('/login', 'AuthController.login')
    // Route.resource('/products', 'ProductsController').apiOnly()
    Route.resource('/categories', 'ProductCategoriesController').apiOnly()
    // Route.resource('categories.subcategories', 'SubcategoriesController')
  })
  .prefix('/v1')
  .prefix('/api')
