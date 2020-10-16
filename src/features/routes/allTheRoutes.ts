import ManageAccounts from '../admin/ManageAccounts';
import CreateAccountPage from '../auth/CreateAccountPage';
import SignInForm from '../auth/SignInForm';
import CheckoutPage from '../checkout-page/CheckOut';
import LandingPage from '../landing-page/LandingPage';
import NoNavbar from '../../common/components/layouts/NoNavbar';
import ProfilePage from '../profile-page/Profile';
import ShopFront from '../shop-front/ShopFront';
import WorkingOnIT from '../TempPage';
import ManageProducts from '../admin/ManageProducts';
import Dashboard from '../admin/Dashboard';

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
    component: LandingPage,
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
    component: ShopFront,
  },
  {
    path: '/shop/:category/:itemID',
    pageTitle: 'shop',
    needsAuth: false,
    adminOnly: false,
    component: ShopFront,
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
    component: Dashboard,
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
    component: ManageProducts,
  },
];

export default allTheRoutes;
