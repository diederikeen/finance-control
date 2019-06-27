import '@babel/polyfill';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import { linearGradient, lighten, rgba } from 'polished';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Routes from '../app/routes';


const CreateGlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    color: #333;
  }

  
  #app {
    min-height: 100%;
  }

  body {
    // font-family: 'Noto Sans HK', sans-serif;
    font-family: 'Rubik', sans-serif;
    background-repeat: no-repeat;
    min-height: 100vh;
    color: #222;
    background-color: #F6F9FE;
  }

  ul,
  ol {
    padding: 0;
  }

  figure {
    margin: 0;
  }

  a {
    transition-property: opacity, color, background;
    transition: 125ms ease;
  }

  p {
    font-size: 16px;
    line-height: 28px;
    font-family: 'Open Sans', sans-serif;
  }
`;

const App = () => (
  <Fragment>
    <CreateGlobalStyle />
    <Router>
      <Fragment>
        {Routes.map(route => (
          <Fragment key={route.path}>
          {route.display
            ? <NavLink
              to={route.path}
              activeClassName="current"
            >
              {route.label}
            </NavLink>
            : ''}
          </Fragment>
        ))}
        <main>
          {Routes.map(route => (
            <Route
              exact={true}
              key={route.path}
              path={route.path}
              component={route.component}
            />
          ))}
        </main>
      </Fragment>
    </Router>
  </Fragment>
);

if (typeof window !== 'undefined') {
  ReactDOM.render(
    <App />,
    document.getElementById('app'),
  );
}
