"use strict";

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
const Route = use('Route');

// Guest API
Route.group(() => {
  Route.post('/register', 'AuthController.register');
  Route.post('/login', 'AuthController.login');
}).prefix('/v1/auth').middleware(['guest']);

// Authed API
Route.group(() => {
  // Logout to be implemented by the client by deleting JWT
  // User
  Route.resource('users', 'UserController').only(['index'])
  // User Profile
  Route.resource('users.profile', 'UserProfileController').only(['show', 'update'])
  // Followers
  Route.resource('users.follow', 'FollowController').only(['store', 'destroy'])
  Route.resource('users.following', 'FollowingController').only(['index'])
  Route.resource('users.followers', 'FollowerController').only(['index'])
  // User Dishes
  Route.resource('users.dishes', 'UserDishController').only(['index'])
  // Favorite (User Favorites)
  Route.resource('users.favorites', 'UserFavoriteController').only(['index'])
  // Favorites (not using resource method because of the delete route...I don't care about the /:id of the favorite itself given this is a pivot table)
  Route.post('users/:users_id/dishes/:dishes_id/favorites', 'FavoriteController.store')
  Route.delete('users/:users_id/dishes/:dishes_id/favorites', 'FavoriteController.destroy')
  // User Bookmarks
  Route.resource('users.bookmarks', 'UserBookmarkController').only(['index'])
  Route.post('/users/:users_id/dishes/:dishes_id/bookmarks', 'BookmarkController.store')
  Route.delete('/users/:users_id/dishes/:dishes_id/bookmarks', 'BookmarkController.destroy')
  // Rating (Dish Ratings)
  Route.post('/users/:users_id/dishes/:dishes_id/ratings', 'RatingController.store')
  Route.put('/users/:users_id/dishes/:dishes_id/ratings', 'RatingController.update')
  Route.patch('/users/:users_id/dishes/:dishes_id/ratings', 'RatingController.update')
  // Dish
  Route.resource('dishes', 'DishController').apiOnly()
  // Step
  Route.resource('dishes.steps', 'StepController').apiOnly()
  // ingredients
  Route.resource('dishes.ingredients', 'IngredientController').apiOnly()
}).prefix('/v1').middleware(['auth']) // prefix individually to version individual endpoints preferred?

