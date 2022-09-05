const app = require("express").Router();

//TMDB
const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

// getmovies(API_URL)

// function getmovies(url){
//     fetch(url).then(res=>res.json).then(data => {
//         console.log(data)
//     }
//         )
// }

app.get("/", (req, res) => {
    res.render("auth/search");
});

const axios = require("axios");
app.get("/result", (req, res) => {
    let query = req.query.search;
    axios
        .get(
            "https://api.themoviedb.org/3/search/movie?api_key=" +
                API_KEY +
                "&query=" +
                query
        )
        .then((response) => {
            // console.log(`statusCode: ${response.status}`);
            // console.log(response.data);
            let data = response.data;
            res.render("result", {
                data: data,
                querySearch: query,
            });
        })
        .catch((error) => {
            console.error(error);
        });
});

module.exports = app;
