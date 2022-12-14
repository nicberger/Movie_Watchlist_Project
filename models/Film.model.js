const { Schema, model } = require("mongoose");
const filmSchema = new Schema({
    movieID: {
        type: Number,
    },
    title: {
        type: String,
    },
    poster_path: {
        type: String,
    },
    user_id: { type: Schema.Types.ObjectId, ref: "Watchlist" },
});

const Film = model("film", filmSchema);

module.exports = Film;
