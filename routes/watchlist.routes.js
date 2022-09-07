const FilmModel = require("../models/Film.model");
const UserModel = require("../models/User.model");
const { Router } = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const res = require("express/lib/response");

const watchlistRouter = Router();

watchlistRouter.get("/create", (req, res) => {
    console.log("request", req.query, req.session.user._id);
    FilmModel.create({
        user_id: req.session.user._id,
        movieID: req.query.id,
        title: req.query.original_title,
        poster_path: req.query.poster_path,
    });
    res.redirect("/watchlist");
});

watchlistRouter.get("/", async (req, res) => {
    const allFilms = await FilmModel.find({
        user_id: req.session.user._id,
    });
    console.log(allFilms);
    res.render("user/watchlist", { allFilms });
});

// ######################### DELETE ENTRY ################################

watchlistRouter.get("/delete", isLoggedIn, async (req, res) => {
    await FilmModel.findByIdAndDelete(req.query.id);
    res.redirect("/watchlist");
});

module.exports = watchlistRouter;
