const Joi = require('joi');
const mongoose = require('mongoose')
const { genreSchema } = require('../models/geners')

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 200
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 100
    },
    dailyRentalRate: {
        type: Number,
        default: 0
    },
})

const Movie = mongoose.model('Movie', movieSchema)

function validateMovie(genre) {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required(),
    };

    return Joi.validate(genre, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;