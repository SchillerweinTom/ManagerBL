const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  founded: { type: Number, required: true },
  stadium: { type: String, required: true },
  logo: { type: String, required: true },
  color: { type: String, required: true },
  titles: { type: String, required: true }
});

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;