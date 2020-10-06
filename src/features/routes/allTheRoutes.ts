import ManageAccounts from '../admin/ManageAccounts';
import CreateAccountPage from '../auth/CreateAccountPage';
import SignInForm from '../auth/SignInForm';
import CheckoutPage from '../checkout-page/CheckOut';
import NoNavbar from '../layouts/NoNavbar';
import ProfilePage from '../profile-page/Profile';
import ShopFront from '../shop-front/ShopFront';
import SpecificCategory from '../shop-front/SpecificCategory';
import WorkingOnIT from '../TempPage';

type Route = {
  path: string;
  pageTitle: string;
  component: any;
  needsAuth: boolean;
  adminOnly: boolean;
  icon?: string;
  customLayout?: any;
};

const allTheRoutes: Route[] = [
  {
    path: '/sign-up',
    pageTitle: 'sign-up',
    needsAuth: false,
    adminOnly: false,
    component: CreateAccountPage,
    customLayout: NoNavbar,
  },
  {
    path: '/sign-in',
    pageTitle: 'sign in',
    needsAuth: false,
    adminOnly: false,
    component: SignInForm,
    customLayout: NoNavbar,
  },
  {
    path: '/',
    pageTitle: 'home',
    needsAuth: false,
    adminOnly: false,
    component: WorkingOnIT,
  },
  {
    path: '/shop',
    pageTitle: 'shop',
    needsAuth: false,
    adminOnly: false,
    component: ShopFront,
  },
  {
    path: '/shop/:category',
    pageTitle: 'shop',
    needsAuth: false,
    adminOnly: false,
    component: SpecificCategory,
  },
  {
    path: '/profile',
    pageTitle: 'profile',
    needsAuth: true,
    adminOnly: false,
    component: ProfilePage,
  },
  {
    path: '/checkout',
    pageTitle: 'checkout',
    needsAuth: true,
    adminOnly: false,
    component: CheckoutPage,
  },
  {
    path: '/info',
    pageTitle: 'info',
    needsAuth: false,
    adminOnly: false,
    component: WorkingOnIT,
  },
  {
    path: '/admin/dashboard',
    pageTitle: 'dashboard',
    needsAuth: true,
    adminOnly: true,
    component: WorkingOnIT,
  },
  {
    path: '/admin/accounts',
    pageTitle: 'accounts',
    needsAuth: true,
    adminOnly: true,
    component: ManageAccounts,
  },
  {
    path: '/admin/products',
    pageTitle: 'products',
    needsAuth: true,
    adminOnly: true,
    component: WorkingOnIT,
  },
];

export default allTheRoutes;
