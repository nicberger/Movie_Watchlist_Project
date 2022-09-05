const { Schema, model } = require("mongoose");
const watchedSchema = new Schema({
    movieID: {
        type: Number,
    },
    title: {
        type: String,
    },
    poster_path: {
        type: String,
    },
    user_id: { type: Schema.Types.ObjectId, ref: "Watched" },
});

const Watched = model("watched", watchedSchema);

module.exports = Watched;
