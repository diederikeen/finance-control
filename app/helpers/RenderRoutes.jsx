import React from 'react';
import { Route, Switch } from 'react-router-dom';

const RenderRoutes = routes => (
  <Switch>
    {routes.map((route, index) => (route.childRoutes ? (
      React.createElement(
        route.component,
        { key: index },
        // eslint-disable-next-line no-undef
        renderRoutes(route.childRoutes),
      )
    ) : (
      <Route key={index} {...route} />
    )))}
  </Switch>
);

export default RenderRoutes;


{/* <Switch>
  {routes.map((route, i) => route.childRoutes ? (
    React.createElement(
      route.component,
      { key: i },
      renderRoutes(route.childRoutes)
    )
  ) : (
    <Route key={i} {...route} />
  ))}
</Switch> */}