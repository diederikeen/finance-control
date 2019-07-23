/* eslint-disable indent */
import { renderToString } from 'react-dom/server';
import Cryptr from 'cryptr';
import keys from '../config/keys';

const cryptr = new Cryptr(keys.cryptr.key);

const RenderDocument = (state, component) => (
`<html>
    <head>
      <title>Finance Control</title>
      <link href="https://fonts.googleapis.com/css?family=Muli:400,600,700,800&display=swap" rel="stylesheet">
    </head>

    <body>
      <div id="app">${renderToString(component)}</div>
      <script>
        window.INITIAL_STATE = ${JSON.stringify({
          id: cryptr.encrypt(state.id),
          firstName: state.first_name,
          lastName: state.last_name,
          income: state.budget,
        })};
      </script>
      <script src='/bundle.js' type="module"></script>
    </body>
  </html>`
);

module.exports = RenderDocument;
