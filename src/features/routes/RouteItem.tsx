import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RootState } from '../../common/store/rootReducer';
import WithNavbar from '../layouts/WithNavbar';
import { Helmet } from 'react-helmet';

export type RouteItemProps = {
  path: string;
  component: any;
  needsAuth: boolean;
  customLayout?: any;
  exact: boolean;
  pageTitle?: string;
};

export default function RouteItem({
  path,
  component: Component,
  customLayout: Layout,
  exact,
  needsAuth,
  pageTitle,
}: RouteItemProps): JSX.Element {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return needsAuth && !isAuthenticated ? (
    <Redirect to="/sign-in" />
  ) : (
    <Route path={path} exact={exact}>
      <>
        <Helmet titleTemplate="%s | hae">
          <title>{pageTitle}</title>
          <meta
            name="description"
            content="Welcome to hae. Hire anything and everything"
          />
        </Helmet>
        {Layout ? (
          <Layout>
            <Component />
          </Layout>
        ) : (
          <WithNavbar>
            <Component />
          </WithNavbar>
        )}
      </>
    </Route>
  );
}
