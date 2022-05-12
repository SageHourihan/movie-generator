var express = require('express');
var router = express.Router();

var movie_controller = require('../controllers/movieController');

/// MOVIE ROUTES ///

// GET catalog home page.
router.get('/', movie_controller.index);

// GET request for creating Movie. NOTE This must come before route for id (i.e. display movie).
router.get('/movie/create', movie_controller.movie_create_get);

// POST request for creating Movie.
router.post('/movie/create', movie_controller.movie_create_post);

// GET request to delete Movie.
router.get('/movie/:id/delete', movie_controller.movie_delete_get);

// POST request to delete Movie.
router.post('/movie/:id/delete', movie_controller.movie_delete_post);

// GET request to update Movie.
router.get('/movie/:id/update', movie_controller.movie_update_get);

// POST request to update Movie.
router.post('/movie/:id/update', movie_controller.movie_update_post);

// GET request for one Movie.
router.get('/movie/:id', movie_controller.movie_detail);

// GET request for list of all Movies.
router.get('/movies', movie_controller.movie_list);

// test for js script
router.get('/test', movie_controller.test);

module.exports = router;