require('@babel/register');
require('@babel/polyfill');
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportSetup = require('./config/passport');
const authRoutes = require('./auth/index');
const apiRoutes = require('./api/index');
const dashboardRoutes = require('./dashboardRoutes/index');
const keys = require('./config/keys');
const { client } = require('./config/db');

const app = express();
const port = 9000;

client.connect();

app.set('views', `${__dirname}/../views`);
app.set('view engine', 'pug');

app.use(express.static(`${__dirname}/../dist`));

// use cookies
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey],
}));

app.use(passport.initialize());
app.use(passport.session());

// auth routes
app.use('/auth/', authRoutes);
// dashboard routes
app.use('/', dashboardRoutes);
// api routes
app.use('/api/', apiRoutes);

app.listen(port, () => `Server is now listening on ${port}`);
