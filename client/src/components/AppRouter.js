import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Switch, Route, Redirect } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { LOGIN_ROUTE } from '../utils/consts';

const AppRouter = function () {
  const isAuth = false;
  return (
    <Switch>
      {isAuth === true && authRoutes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          component={Component}
          exact
        />
      ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          component={Component}
          exact
        />
      ))}
      <Redirect to={LOGIN_ROUTE} />
    </Switch>
  );
};

export default AppRouter;
