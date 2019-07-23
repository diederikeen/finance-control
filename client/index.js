require('@babel/register');
require('@babel/polyfill');
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Styled, { createGlobalStyle } from 'styled-components';
import { linearGradient, rgba } from 'polished';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Routes from '../app/routes';
import { Colors, Container } from '../app/styles';


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

  body {
    background-color: aliceblue;
  }
  
  #app {
    min-height: 100%;
  }

  body {
    font-family: 'Muli', sans-serif;
    background-repeat: no-repeat;
    min-height: 100vh;
    color: #222;
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
    line-height: 26px;
    font-family: 'Open Sans', sans-serif;
  }

  input,select {
    height: 50px;
    border-radius: 3px;
    font-size: 16px;
    padding: 0 12px;
    border: none;
    border: 1px solid ${rgba(0, 0, 0, 0.1)};
  }

  fieldset {
    border: none;
    padding: 0;
  }
`;

const AppHeader = Styled.header`
  height: 100px;
  ${linearGradient({
    colorStops: [Colors.defaultBlue, Colors.darkerBlue],
    toDirection: 'to right',
  })}
  
  > div {
    display: flex;
    height: 100%;
  }
`;

const AppNav = Styled.nav`
  margin: 0 0 0 auto;
  align-self: center;

  a {
    color: white;
    font-size: 16px;
    margin: 0 0 0 12px;
    opacity: .7;
    padding: 6px 16px;
    border-radius: 5px;
    text-decoration: none;
    font-weight: 600;

    &.current {
      opacity: 1;
      text-shadow: 0px 4px 12px ${rgba('#000', 0.2)}
    }
  }
`;

const App = () => (
  <Fragment>
    <CreateGlobalStyle />
    <Router>
      <Fragment>
        <AppHeader>
          <Container>
            <AppNav>
              {Routes.map(route => (
                <Fragment key={route.path}>
                {route.display
                  && <NavLink
                      to={route.path}
                      exact={route.exact}
                      activeClassName="current"
                  >
                    {route.label}
                  </NavLink> }
                </Fragment>
              ))}
            </AppNav>
          </Container>
        </AppHeader>
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
