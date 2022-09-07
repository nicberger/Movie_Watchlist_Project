const FilmModel = require("../models/Film.model");
const UserModel = require("../models/User.model");
const { Router } = require("express");

const watchlistRouter = Router();

// watchlistRouter.get("/create", (req, res) => {
//     FilmModel.create({
//         user_id: req.session.user._id,
//         movieID: req.query.id,
//         title: req.query.original_title,
//         poster_path: req.query.poster_path,
//     })
//         .then((createdFilm) => {
//             UserModel.findByIdAndUpdate(
//                 req.session.userId,
//                 {
//                     $push: { watchlist: createdFilm._id },
//                 },
//                 {
//                     new: true,
//                 }
//             ).then(() => {
//                 const allFilms = FilmModel.find({});
//                 console.log(allFilms);
//                 res.render("user/watchlist", { allFilms });
//             });
//         })
//         .catch((err) => {
//             console.log("Oopsie", err);
//             // TODO: Do better error handling
//             res.redirect("/");
//         });
// });
// module.exports = watchlistRouter;

// ######################### Old Code ################################

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

// watchlistRouter.get("/watchlist", isLoggedIn, async (req, res) => {
//     const film = await FilmModel.findById(req.session.user._id);

//     await UserModel.findByIdAndDelete(req.session.user._id);

//     req.session.destroy((err) => {
//         if (err) {
//             return res
//                 .status(500)
//                 .render("auth/logout", { errorMessage: err.message });
//         }
//         res.redirect("/");
//     });
// });

module.exports = watchlistRouter;
