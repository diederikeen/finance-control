const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
  res.render('index');
});

router.get('/google', passport.authenticate('google', {
  scope: ['profile'],
}));


router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/profile/');
});

router.get('/logout/', (req, res) => {
  req.logout();
  res.redirect('/auth/login/');
});

module.exports = router;
