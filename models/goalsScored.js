const mongoose = require('mongoose');

const goalsScoredSchema = new mongoose.Schema({
  matchday: { type: String, required: true },
  goals: { type: Number, required: true },
});

const GoalsScored = mongoose.model('GoalsScored', goalsScoredSchema);

module.exports = GoalsScored;