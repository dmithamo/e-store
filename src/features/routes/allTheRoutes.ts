import CreateAccountPage from '../auth/CreateAccountPage';
import SignInForm from '../auth/SignInForm';
import NoNavbar from '../layouts/NoNavbar';
import WorkingOnIT from '../TempPage';

export default [
  {
    path: '/create-account',
    name: 'create-account',
    icon: 'home',
    component: CreateAccountPage,
    customLayout: NoNavbar,
  },
  {
    path: '/sign-in',
    name: 'sign in',
    icon: 'home',
    component: SignInForm,
    customLayout: NoNavbar,
  },
  {
    path: '/',
    name: 'home',
    icon: 'home',
    component: WorkingOnIT,
  },
  {
    path: '/info',
    name: 'info',
    icon: 'info',
    component: WorkingOnIT,
  },
];
