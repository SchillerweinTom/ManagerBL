const mongoose = require('mongoose');

const teamPerformanceSchema = new mongoose.Schema({
  team: { type: String, required: true },
  points: { type: Number, required: true },
  color: { type: String, required: true },
});

const TeamPerformance = mongoose.model('TeamPerformance', teamPerformanceSchema);

module.exports = TeamPerformance;
