import CreateAccountPage from '../auth/CreateAccountPage';
import NoNavbar from '../layouts/NoNavbar';
import WorkingOnIT from '../TempPage';

export default [
  {
    path: '/',
    name: 'create-account',
    icon: 'home',
    component: CreateAccountPage,
    customLayout: NoNavbar,
  },
  {
    path: '/store-front',
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
