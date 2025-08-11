const express = require("express");
const mongoose = require('mongoose');

const app = express();

async function connectToMongoDB() {
    try{
        await mongoose.connect("mongodb://localhost:27017/netflix"); 
        console.log("MongoDB is connected");
    } catch {
        console.log(error);
    }
};

connectToMongoDB();

const movieSchema = new mongoose.Schema({
    title: String,
    director: String,
    release_year: Number,
    genre: String,
    rating: Number,
});


const showSchema = new mongoose.Schema({
    title: String,
    creator: String,
    premiere_year: Number,
    end_year: Number,
    seasons: Number,
    genre: String,
    rating: Number,
});

const Movie = mongoose.model("Movie", movieSchema);
const Show = mongoose.model("Show", showSchema);

app.get("/", (req, res) => {
    res.send("Happy coding");
});

/*
Routes for movies
GET /movies - LIST all the movies
GET /movies/1232132131232asdwasd21eqdw12 = get a specific movue
POST /movies - add new movie
PUT /movies/wqe21ewqe21e3rrr432rf4332rf - update movie
DELETE /movies/u34i3h24uy2b4uy32g4jhb24 - delete movie
*/

app.get("/movies", async (req, res) => {
    const director = req.query.director;
    const genre = req.query.genre;
    const rating = req.query.rating;

    let filter = {};

    if(director) {
        filter.director = director;
    };

    if(genre) {
        filter.genre = genre;
    };

    if(rating) {
        filter.rating = { $gt: rating};
    };

    const movies = await Movie.find(filter);
    res.send(movies);
});

app.get("/shows", async (req, res) => {
    const genre = req.query.genre;
    const premiere_year = req.query.premiere_year;
    const rating =  req.query.rating;

    let filter = {};

    if(genre) {
        filter.genre = genre;
    };

    if(rating) {
        filter.rating = { $gt: rating};
    };

    if(premiere_year) {
        filter.premiere_year = { $gt: premiere_year};
    };

    const shows = await Show.find(filter);
    res.send(shows);
});

app.get ("/movies/:id", async (req, res) => {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    res.send(movie);
});

app.get ("/shows/:id", async (req, res) => {
    const id = req.params.id;
    const show = await Show.findById(id);
    res.send(show);
});

app.listen(5143, () => {
    console.log("server is runnig at http://localhost:5143");
});