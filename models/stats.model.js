const mongoose = require("mongoose");

const statsdb = new mongoose.Schema({
  _id: String,
  created_by: { type: String, default: "Anonymous" },
  viewers_counts: { type: Number, default: 0 },
  title: String,
  icon: String
});

const StatsModel = mongoose.model("stats", statsdb);

module.exports = StatsModel;
