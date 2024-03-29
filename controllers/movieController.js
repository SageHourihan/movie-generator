var Movie = require('../models/movie')
var async = require('async');
const movieArt = require('movie-art')
const { body, validationResult } = require("express-validator");
const res = require('express/lib/response');
const { collection } = require('../models/movie');
const open = require('open');

exports.index = function (req, res) {
    res.render('index', { title: 'Movie Generator' });
};

// TODO: version 2: add filters such as: all, watched, unwatched.
exports.movie_list = function (req, res, next) {

    Movie.find()
        .sort([['title', 'ascending']])
        .find({ watched: false })
        .exec(function (err, list_movies) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('movies_list', { title: 'Movie List', movie_list: list_movies });
        });

};

exports.movie_detail = function (req, res, next) {
    Movie.findById(req.params.id)
        .populate('title')
        .exec(function (err, movie) {
            if (err) { return next(err); }
            if (movie == null) { //no results.
                var err = new Error('Movie not found');
                err.status = 404;
                return next(err);
            }
            //successful, so render.
            movieArt(movie.title, (error, response) => {
                console.log(movie.title + ' ' + response);
                res.redirect(response);
            });
        });
};

// Display Movie create form on GET.
exports.movie_create_get = function (req, res, next) {
    res.render('movie_form', { title: 'Add Movie' });
};
// Handle movie create on POST.
exports.movie_create_post = [

    // Validate and sanitize the name field.
    body('name', 'Movie title required').trim().isLength({ min: 1 }).escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a movie object with escaped and trimmed data.
        var movie = new Movie(
            {
                title: req.body.name,
                watched: false
            }
        );
        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('movie_form', { title: 'Create Movie', movie: movie, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.
            // Check if Movie with same title already exists.
            Movie.findOne({ 'title': req.body.name })
                .exec(function (err, found_movie) {
                    if (err) { return next(err); }
                    if (found_movie) {
                        // Movie exists, redirect to its detail page.
                        res.redirect(found_movie.url);
                    }
                    else {

                        movie.save(function (err) {
                            if (err) { return next(err); }
                            // Movie saved. Redirect to movie detail page.
                            res.redirect(movie.url);
                        });
                    }
                });
        }
    }
];

// Display Movie delete form on GET.
exports.movie_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Movie delete GET');
};

// Handle Movie delete on POST.
exports.movie_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Movie delete POST');
};

// Display Movie update form on GET.
exports.movie_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Movie update GET');
};

// Handle Movie update on POST.
exports.movie_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Movie update POST');
};

// Handle Movie random on GET.
exports.movie_random = async function (req, res, next) {

    // gets title of movies not watched
    const cursor = collection.find({ watched: false }).project({ _id: 0, __v: 0, watched: 0 });

    // puts json to array
    const allValues = await cursor.toArray();
    // gets length of list
    let movieArrayLength = allValues.length;
    // gets random number
    let n = Math.floor(Math.random() * movieArrayLength);
    // turns array value to string
    let title = JSON.stringify(allValues[n]);
    let mTitle = title.split('"');
    // gets random movie art
    movieArt(mTitle[3], (error, response) => {
        open(response);
    });
};
