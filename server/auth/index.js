const router = require('express').Router();

router.get('/login', (req, res) => {
  res.send('login-page');
});

router.get('/google', (req, res) => {
  res.send('login-with-google');
});


router.get('/google/redirect', (req, res) => {
  res.send('cb');
});

router.get('logout', (req, res) => {
  res.send('loggin out');
});

module.exports = router;
