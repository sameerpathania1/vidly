const express = require('express');
const router = express.Router();
const { Movie, validate } = require('../models/movies');
const { Genre } = require('../models/geners');

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title');
    res.send(movies);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    await movie.save();
    // let genre = new Movie({ name: req.body.name });
    // genre = await genre.save();
    res.send(movie);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    // const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

// router.delete('/:id', async (req, res) => {
//     const genre = await Movie.findByIdAndRemove(req.params.id);
//     // const genre = genres.find(c => c.id === parseInt(req.params.id));
//     if (!genre) return res.status(404).send('The genre with the given ID was not found.');

//     // const index = genres.indexOf(genre);
//     // genres.splice(index, 1);

//     res.send(genre);
// });

// router.get('/:id', async (req, res) => {
//     const genre = await Movie.findById(req.params.id)
//     // const genre = genres.find(c => c.id === parseInt(req.params.id));
//     if (!genre) return res.status(404).send('The genre with the given ID was not found.');

//     res.send(genre);
// });

module.exports = router;