const mongoose = require("mongoose");

const redditArticle = mongoose.model("redditArticle", mongoose.Schema({
  title: String
}));

module.exports = redditArticle;
