const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const session = require('express-session');

const app = express();
const router = require('./routes/routes');
const routerAPI = require('./routes/router');

const connectDB = require('./db');
connectDB();

app.use(
  session({
    secret: 'agvsas2m7001n21932z1m972,12z8mn71963n721n27',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 3600000,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static('public'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(async (req, res, next) => {
  res.locals.user = req.session.userId ? { id: req.session.userId, username: req.session.username } : null;
  next();
});

app.use('/api', routerAPI);
app.use('/', router);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});
