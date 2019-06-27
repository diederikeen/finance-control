require('@babel/register');
require('@babel/polyfill');
// require('../app/index.js');
const express = require('express');
const { client } = require('./config/db');
const authRoutes = require('./auth/index');
const apiRoutes = require('./api/index');
const Routes = require('../app/routes/index.js').default;

const app = express();
const port = 9000;
client.connect();

app.set('views', `${__dirname}/../views`);
app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/../dist`));

// Defining web routes in ./routes/index.js
Routes.map((route) => {
  const { path } = route;
  app.get(path, (req, res) => {
    res.render('index');
  });

  return route;
});

// auth routes
app.use('/auth/', authRoutes);
// api routes
app.use('/api/', apiRoutes);

app.listen(port, () => `Server is now listening on ${port}`);
