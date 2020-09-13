import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import NotFound from '../404';
import allTheRoutes from './allTheRoutes';
import RouteItem from './RouteItem';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        {/* Create account page */}
        <RouteItem
          key={allTheRoutes[0].name}
          path={allTheRoutes[0].path}
          exact
          component={allTheRoutes[0].component}
          customLayout={allTheRoutes[0].customLayout}
        />

        {/* Other routes */}
        {allTheRoutes.slice(1).map((r) => (
          <RouteItem key={r.name} path={r.path} exact component={r.component} />
        ))}

        {/* Catch-all for 404s */}
        <RouteItem key="404" path="*" exact={false} component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
