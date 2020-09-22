import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RootState } from '../../common/store/rootReducer';
import WithNavbar from '../layouts/WithNavbar';

export type RouteItemProps = {
  path: string;
  component: any;
  needsAuth: boolean;
  customLayout?: any;
  exact: boolean;
};

export default function RouteItem({
  path,
  component: Component,
  customLayout: Layout,
  exact,
  needsAuth,
}: RouteItemProps): JSX.Element {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return needsAuth && !isAuthenticated ? (
    <Redirect to="/sign-in" />
  ) : (
    <Route path={path} exact={exact}>
      {Layout ? (
        <Layout>
          <Component />
        </Layout>
      ) : (
        <WithNavbar>
          <Component />
        </WithNavbar>
      )}
    </Route>
  );
}
