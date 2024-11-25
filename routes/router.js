const express = require('express');
const routerAPI = express.Router();
const TopScorer = require('../models/topScorer');
const TeamPerformance = require('../models/teamPerformance');
const GoalsScored = require('../models/goalsScored');


routerAPI.get('/chartTeam', async (req, res) => {
  const data = await TeamPerformance.find();
  res.json(data);
});

routerAPI.get('/chartScore', async (req, res) => {
  const data = await TopScorer.find();
  res.json(data);
});

routerAPI.get('/chartGoals', async (req, res) => {
  const data = await GoalsScored.find();
  res.json(data);
});


routerAPI.get('*', (req, res) => {
  res.render('404');
})

module.exports = routerAPI;