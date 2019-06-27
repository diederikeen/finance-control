const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth');
const { google } = require('./keys');

passport.use(new GoogleStrategy({
  callBackURL: '/auth/google/redirect',
  clientID: google.clientID,
  clientSecret: google.clientSecret,
}, () => {
  // passport callback;
}));

module.export = passport;
