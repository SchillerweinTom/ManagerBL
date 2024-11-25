const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');
const User = require('../models/user');
const Team = require('../models/team');
const Player = require('../models/player');
const Stats = require('../models/stats');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/teams', async (req, res) => {
    try {
        const teams = await Team.find();
        const user = res.locals.user ? true : false;
        
        res.render('teams', { teams: teams, user: user });
      } catch (error) {
        console.error('Error fetching teams:', error);
        res.status(500).send('Internal Server Error');
      }
});

router.get('/players', async (req, res) => {
    try {
        const players = await Player.find();
        players.sort((a, b) => a.name.localeCompare(b.name));
        res.render('players', { players });
      } catch (error) {
        console.error('Error fetching players:', error);
        res.status(500).send('Internal Server Error');
      }
});

router.get('/statistics', async (req, res) => {
  try {
    const stats = await Stats.find();
    const statistics = stats[0];
    res.render('stats', { stats: statistics });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/admin', auth, (req, res) => {
  res.render('admin');
});

router.get('/editTeam/:id',  async (req, res) => {
  const teamId = req.params.id;

  try {
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).send('Team not found');
    }

    res.render('editTeam', { team: team });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.post('/editTeam/:id', auth, async (req, res) => {
  const teamId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedTeam = await Team.findByIdAndUpdate(teamId, updatedData, { new: true });

    if (!updatedTeam) {
      return res.status(404).send('Team not found');
    }
    res.redirect('/teams');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating team');
  }
});

router.get('/addTeam', auth, async (req, res) => {
  const teamId = req.params.id;

  res.render('addTeam');
});

router.post('/addTeam', auth, upload.single('logo'), async (req, res) => {
  try {
    const { name, founded, stadium, titles, color } = req.body;
    
    const logo = req.file ? `/images/${req.file.filename}` : '/images/badge.png';

    if (!name || !founded || !stadium || !titles || !color) {
      return res.status(400).send('All fields except logo are required.');
    }

    const newTeam = new Team({
      name,
      founded,
      stadium,
      titles,
      color,
      logo,
    });

    await newTeam.save();
    
    res.redirect('/teams');
  } catch (error) {
    console.error('Error adding team:', error);
    res.status(500).send('Server error, unable to add team.');
  }
});

router.post('/deleteTeam/:id', auth, async (req, res) => {
  try {
    const teamId = req.params.id;

    await Team.findByIdAndDelete(teamId);

    res.redirect('/teams');
  } catch (error) {
    console.error('Error deleting team:', error);
    res.status(500).send('Server error, unable to delete team.');
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  var error = '';
  if (!username || !password) {
    error = 'Username and password are required';
    return res.status(400).render('login', {error} );
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      error = 'Invalid username or password';
      return res.status(400).render('login', {error} );
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      error = 'Invalid username or password';
      return res.status(400).render('login', {error} );
    }
    req.session.userId = user._id;
    req.session.username = user.username;

    res.status(200).redirect('/admin');
  } catch (error) {
    console.error(error);
    return res.status(500).render('login',error ='Server Error' );
  }
});

router.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Logout failed. Please try again.' });
      }

      res.status(200).render('index');
    });
  } else {
    res.status(400).json({ message: 'No active session found.' });
  }
});

router.get('*', (req, res) => {
    res.render('404');
})


module.exports = router;