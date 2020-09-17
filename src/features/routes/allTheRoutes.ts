import CreateAccountPage from '../auth/CreateAccountPage';
import SignInForm from '../auth/SignInForm';
import NoNavbar from '../layouts/NoNavbar';
import WorkingOnIT from '../TempPage';

type Route = {
  path: string;
  name: string;
  component: any;
  needsAuth: boolean;
  icon?: string;
  customLayout?: any;
};

const allTheRoutes: Route[] = [
  {
    path: '/create-account',
    name: 'create-account',
    icon: 'home',
    needsAuth: false,
    component: CreateAccountPage,
    customLayout: NoNavbar,
  },
  {
    path: '/sign-in',
    name: 'sign in',
    icon: 'home',
    needsAuth: false,
    component: SignInForm,
    customLayout: NoNavbar,
  },
  {
    path: '/',
    name: 'home',
    icon: 'home',
    needsAuth: false,
    component: WorkingOnIT,
  },
  {
    path: '/info',
    name: 'info',
    icon: 'info',
    needsAuth: false,
    component: WorkingOnIT,
  },
  {
    path: '/secured-route-test',
    name: 'secured route',
    icon: 'info',
    needsAuth: true,
    component: WorkingOnIT,
  },
];

export default allTheRoutes;
