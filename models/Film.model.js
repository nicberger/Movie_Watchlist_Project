const { Schema, model } = require("mongoose");
const filmSchema = new Schema({
  title: {
    type: String,
  },
});

const Film = model("film", filmSchema);

module.exports = Film;
