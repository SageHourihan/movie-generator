var Movie = require('../models/movie')
var async = require('async');
const { body,validationResult } = require("express-validator");

exports.index = function(req, res) {
    res.render('index', {title: 'Movie Generator'});
};


// Display list of all Movies.
// exports.movie_list = function(req, res) {
//     res.render('movies_list', {title: 'Movie Generator'});
// };
exports.movie_list = function(req, res, next) {

    Movie.find()
      .sort([['title', 'ascending']])
      .exec(function (err, list_movies) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('movies_list', { title: 'Movie List', movie_list: list_movies });
      });

  };


// Display detail page for a specific Movie.
exports.movie_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Movie detail: ' + req.params.id);
};

// Display Movie create form on GET.
exports.movie_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Movie create GET');
};

// Handle Movie create on POST.
exports.movie_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Movie create POST');
};

// Display Movie delete form on GET.
exports.movie_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Movie delete GET');
};

// Handle Movie delete on POST.
exports.movie_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Movie delete POST');
};

// Display Movie update form on GET.
exports.movie_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Movie update GET');
};

// Handle Movie update on POST.
exports.movie_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Movie update POST');
};
