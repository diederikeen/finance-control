import Routes from '../../app/routes/index';
import renderDocument from '../helpers/RenderDocument';

const router = require('express').Router();
const cookieSession = require('cookie-session');

const markup = (state, component) => (
  renderDocument(
    state,
    component,
  )
);

const authCheck = (req, res, next) => {
  if (!req.user) res.redirect('/auth/login/');
  else next();
};

Routes.map((route) => {
  const { path } = route;
  // console.log(cookieSession.get());
  router.get(path, authCheck, (req, res) => {
    res.send(markup(req.user, route.component));
  });

  return route;
});

module.exports = router;
