const mongoose = require('mongoose');

const StatsSchema = new mongoose.Schema({
  totGoals: { type: Number, required: true },
  avgGoals: { type: Number, required: true },
  clean: { type: Number, required: true },
  redCards: { type: Number, required: true }
});

const Stats = mongoose.model('Stats', StatsSchema);

module.exports = Stats;