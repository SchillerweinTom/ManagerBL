const mongoose = require('mongoose');

const topScorerSchema = new mongoose.Schema({
  name: String,
  goals: Number,
  team: String,
  color: String,
});

module.exports = mongoose.model('TopScorer', topScorerSchema);
