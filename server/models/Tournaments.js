const mongoose = require("mongoose");

const TournamentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  start: {
    type: Date,
    default: Date.now,
  },
  end: {
    type: Date,
    default: Date.now,
  },
  registers: {
    type: Array,
    default: [],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Tournaments = mongoose.model("tournaments", TournamentsSchema);
