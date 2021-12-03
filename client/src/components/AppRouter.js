import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { Context } from '../index';
import { LOGIN_ROUTE, WORKSPACES } from '../utils/consts';

const AppRouter = function () {
  const { user } = useContext(Context);

  console.log(user);
  return (
    <Switch>
      {user.isAuth === true && authRoutes.map(({ path, Component }) => (
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
      { user.isAuth === true
        ? <Redirect to={WORKSPACES} />
        : <Redirect to={LOGIN_ROUTE} />}
    </Switch>
  );
};

export default AppRouter;
