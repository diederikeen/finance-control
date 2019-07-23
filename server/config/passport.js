const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const { google } = require('./keys');
const { client } = require('./db');

passport.serializeUser(({ id }, done) => {
  done(null, id);
});

passport.deserializeUser((id, done) => {
  const query = {
    name: 'retrieve-connected-user',
    text: 'SELECT * FROM users WHERE id = $1',
    values: [id],
  };

  client.query(query)
    .then(({ rows: users }) => {
      done(null, users[0]);
    });
});

function createNewUser({ _json }) {
  const {
    sub,
    given_name: givenName,
    family_name: familyName,
    picture,
  } = _json;

  const query = {
    name: 'Retrieve user',
    text: 'INSERT INTO users(google_id, first_name, last_name, picture_url, created_at) VALUES($1, $2, $3, $4, $5)',
    values: [sub, givenName, familyName, picture, new Date()],
  };

  client.query(query)
    .then(res => console.log(res));
}

passport.use(new GoogleStrategy({
  callbackURL: '/auth/google/redirect',
  clientID: google.clientID,
  clientSecret: google.clientSecret,
}, (accesToken, refreshToken, profile, done) => {
  const { id } = profile;

  const query = {
    name: 'retrieve-user',
    text: 'SELECT * FROM users WHERE google_id = $1',
    values: [id],
  };

  client.query(query)
    .then(({ rows: users }) => {
      if (!users.length) {
        createNewUser(profile);
      } else {
        done(null, users[0]);
      }
    });
}));

module.export = passport;
