const { Schema, model } = require("mongoose");
const watchlistSchema = new Schema({
  title: {
    type: String,
  },
});

const Watchlist = model("watchlist", watchlistSchema);

module.exports = Watchlist;
