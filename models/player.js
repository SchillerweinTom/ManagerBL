const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  team: { type: String, required: true },
  age: { type: Number, required: true },
  image: { type: String, required: true },
  teamColor: { type: String, required: true }
});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;