const { response } = require('express');
const db = require('../database/models');
// const sequelize = db.sequelize;
// const { Op } = require("sequelize");
const Op = db.Sequelize.Op;

const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;

let moviesController = {
    list: (req, res) => {
        db.Movie.findAll().then(movies => {
            res.render('moviesList', {movies: movies});
        })
    },
    detail: (req, res) => {
        db.Movie.findByPk(req.params.id, {
            include: [ {association: 'genre'}, {association: 'actors'}]
        }).then((movie) => {
            res.render('movieDetail', {movie: movie});
        })
    },
    add: (req, res) => {
        db.Genre.findAll().then(genres => {
            res.render('moviesAdd', {genres: genres});
        })
    },
    create: (req, res) => {
        db.Movie.create({
            ...req.body
        }).then(() => {
            res.redirect('/movies');
        })
    },
    edit: (req, res) => {
        // db.Movie.findByPk(req.params.id).then(movie => {
        //     db.Genre.findAll().then(genres => {
        //         res.render('movieEdit', {movie:movie, genres:genres})
        //     })
        // })
        let moviePromise = db.Movie.findByPk(req.params.id);
        let genresPromise = db.Genre.findAll();
        Promise.all([moviePromise, genresPromise]).then(([movie, genres]) => {
            res.render('movieEdit', {movie:movie, genres:genres});
        })
    },
    update: (req, res) => {
        db.Movie.update({
            ...req.body
        },
        {
            where: {id: req.params.id }
        }).then(() => {
            res.redirect('/movies/detail/' + req.params.id)
        })
    },
    delete: (req, res) => {
        db.Movie.findByPk(req.params.id).then(movie => {
            res.render('movieDelete', {movie:movie})
        })
    },
    destroy: (req, res) => {
        db.Movie.destroy({
            where: {
                id: req.params.id
            }
        }).then (() => {
            res.redirect('/movies');
        })
    },
    listAPI: (req, res) => {
        db.Movie.findAll().then(movies => {
            res.status(200).json({
                total: movies.length,
                data: movies,
                status: 200
            })
        })
    },
    detailAPI: (req, res) => {
        db.Movie.findByPk(req.params.id).then(movie => {
            res.status(200).json({
                data: movie,
                status: 200
            })
        })
    },
    storeAPI: (req, res) => {
        db.Movie.create(req.body).then((movie)=> {
            res.status(201).json({
                meta: {
                    status: 201,
                    total: 1,
                    url: 'api/movies/create',
                    created: 'ok'
                },
                data: movie
            })
        })
        .catch(error => res.status(500).json(error))
    },
    deleteAPI: (req, res) => {
        let movieId = req.params.id;
        let movieToDelete = Movies.findByPk(movieId);
        let deleteMovie = Movies.destroy({
            where: {
                id: movieId
            },
            force: true
        });
        Promise.all([movieToDelete, deleteMovie]).then(([movie, response]) => {
            res.status(200).json({
                meta: {
                    status: 200,
                    total: 1,
                    url: `api/movies/delete/${movieId}`,
                    response: response
                },
                data: movie
            })
        })
        .catch(error => res.status(500).json(error))
    },
    searchAPI: (req, res) => {
        db.Movie.findAll({
            where: {
                title: { [Op.like]: `%${req.query.keyword}%` } // NO FUNCIONA!!!!!!!!!!!!! http://localhost:3000/movies/api/search?keyword=harry
            }
        }).then(movies => {
            if (movies.length > 0) {
                return res.status(200).json(movies);
            } else {
                return res.status(200).json('No existen películas');
            }
        })
    },
    updateAPI: (req, res) => {
        db.Movie.update({
            ...req.body
        },
        {
            where: { id: req.params.id}
        }).then(response => {
            res.status(200).json({
                response: response,
                status: 200,
                updated: 'ok'
            })
        })
    },
}

module.exports= moviesController;