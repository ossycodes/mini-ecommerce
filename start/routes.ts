import Route from '@ioc:Adonis/Core/Route'

Route
  .group(() => {
    Route.post('/register', 'AuthController.register')
    Route.post('/login', 'AuthController.login')
    Route
      .group(() => {
        Route.resource('/products', 'ProductsController').apiOnly()
        Route.resource('/categories', 'ProductCategoriesController').apiOnly()
        Route.resource('/subcategories', 'ProductSubCategoriesController').apiOnly()
      })
      .middleware('auth')
  })
  .prefix('/v1')
  .prefix('/api')
