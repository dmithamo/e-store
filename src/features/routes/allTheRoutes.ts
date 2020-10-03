import CreateAccountPage from '../auth/CreateAccountPage';
import SignInForm from '../auth/SignInForm';
import CheckoutPage from '../checkout-page/CheckOut';
import NoNavbar from '../layouts/NoNavbar';
import ProfilePage from '../profile-page/Profile';
import WorkingOnIT from '../TempPage';

type Route = {
  path: string;
  pageTitle: string;
  component: any;
  needsAuth: boolean;
  icon?: string;
  customLayout?: any;
};

const allTheRoutes: Route[] = [
  {
    path: '/sign-up',
    pageTitle: 'sign-up',
    needsAuth: false,
    component: CreateAccountPage,
    customLayout: NoNavbar,
  },
  {
    path: '/sign-in',
    pageTitle: 'sign in',
    needsAuth: false,
    component: SignInForm,
    customLayout: NoNavbar,
  },
  {
    path: '/',
    pageTitle: 'home',
    needsAuth: false,
    component: WorkingOnIT,
  },
  {
    path: '/shop',
    pageTitle: 'shop',
    needsAuth: false,
    component: WorkingOnIT,
  },
  {
    path: '/profile',
    pageTitle: 'profile',
    needsAuth: true,
    component: ProfilePage,
  },
  {
    path: '/checkout',
    pageTitle: 'checkout',
    needsAuth: true,
    component: CheckoutPage,
  },
  {
    path: '/info',
    pageTitle: 'info',
    needsAuth: false,
    component: WorkingOnIT,
  },
];

export default allTheRoutes;
