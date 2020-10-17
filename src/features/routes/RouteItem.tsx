import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RootState } from '../../common/store/rootReducer';
import WithNavbar from '../../common/components/layouts/WithNavbar';
import { Helmet } from 'react-helmet';

export type RouteItemProps = {
  path: string;
  component: any;
  needsAuth: boolean;
  adminOnly: boolean;
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
  adminOnly,
  pageTitle,
}: RouteItemProps): JSX.Element {
  const {
    user: { isLoggedIn, isVerified, roleId },
  } = useSelector((state: RootState) => state.auth);

  const isAdmin = roleId === 1;

  if (needsAuth && isLoggedIn && !isVerified) {
    return <Redirect to="/verify-account" />;
  }

  if (needsAuth && !isLoggedIn) {
    return <Redirect to="/sign-in" />;
  }
  if (adminOnly && !isAdmin) {
    return <Redirect to="/not-what-u-r-looking-for" />;
  }

  if (!adminOnly && isAdmin) {
    return <Redirect to="/admin/accounts" />;
  }

  return (
    <Route path={path} exact={exact}>
      <>
        <Helmet titleTemplate="%s | hae" defaultTitle="hae">
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
