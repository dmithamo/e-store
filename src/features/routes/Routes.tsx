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
            key={r.name}
            path={r.path}
            exact
            component={r.component}
            customLayout={r?.customLayout || null}
          />
        ))}

        {/* Catch-all for 404s */}
        <RouteItem key="404" path="*" exact={false} component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
