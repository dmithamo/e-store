import CreateAccountPage from '../auth/CreateAccountPage';
import SignInForm from '../auth/SignInForm';
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
    icon: 'home',
    needsAuth: false,
    component: CreateAccountPage,
    customLayout: NoNavbar,
  },
  {
    path: '/sign-in',
    pageTitle: 'sign in',
    icon: 'home',
    needsAuth: false,
    component: SignInForm,
    customLayout: NoNavbar,
  },
  {
    path: '/',
    pageTitle: 'home',
    icon: 'home',
    needsAuth: false,
    component: WorkingOnIT,
  },
  {
    path: '/profile',
    pageTitle: 'profile',
    icon: 'profile',
    needsAuth: true,
    component: ProfilePage,
  },
  {
    path: '/info',
    pageTitle: 'info',
    icon: 'info',
    needsAuth: false,
    component: WorkingOnIT,
  },
];

export default allTheRoutes;
