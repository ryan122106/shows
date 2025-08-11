const express = require("express");
//create a express router
const router = express.Router();

// import the Show model
const Show = require("../models/show");

/* 
  Routes for shows
  GET /shows - list all the shows
  GET /shows/68943cf564aa9f8354cef260 - get a specific show
  POST /shows - add new show
  PUT /shows/68943cf564aa9f8354cef260 - update show
  DELETE /shows/68943cf564aa9f8354cef260 - delete show
*/
// GET /shows - list all the shows
/*
  query params is everything after the ? mark
*/
router.get("/", async (req, res) => {
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



router.get ("/:id", async (req, res) => {
    const id = req.params.id;
    const show = await Show.findById(id);
    res.send(show);
});

module.exports = router;
