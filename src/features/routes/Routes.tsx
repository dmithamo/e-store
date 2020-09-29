import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import NotFound from '../404';
import allTheRoutes from './allTheRoutes';
import RouteItem from './RouteItem';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        {allTheRoutes.map((r) => (
          <RouteItem
            key={r.pageTitle}
            path={r.path}
            exact
            component={r.component}
            needsAuth={r.needsAuth}
            customLayout={r?.customLayout || null}
            pageTitle={r.pageTitle}
          />
        ))}

        {/* Catch-all for 404s */}
        <RouteItem
          needsAuth={false}
          key="404"
          path="*"
          exact={false}
          component={NotFound}
          pageTitle="404"
        />
      </Switch>
    </BrowserRouter>
  );
}
