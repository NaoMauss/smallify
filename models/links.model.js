const mongoose = require("mongoose");

const linkdb = new mongoose.Schema({
  _id: String,
  url: {
    type: String,
    required: true,
  },
  created_at: Date,
});

const LinkModel = mongoose.model("link", linkdb);

module.exports = LinkModel;
