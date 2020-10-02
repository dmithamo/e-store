import CreateAccountPage from '../auth/CreateAccountPage';
import SignInForm from '../auth/SignInForm';
import NoNavbar from '../layouts/NoNavbar';
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
    path: '/info',
    pageTitle: 'info',
    icon: 'info',
    needsAuth: false,
    component: WorkingOnIT,
  },
];

export default allTheRoutes;
