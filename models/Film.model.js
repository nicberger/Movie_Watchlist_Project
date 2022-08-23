const { Schema, model } = require("mongoose");
const filmSchema = new Schema(
  {
    title: {
      type: String,
    },
  },
);

const Movie = model("film", filmSchema);

module.exports = Film;
