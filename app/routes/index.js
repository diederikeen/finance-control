import Overview from '../components/overview/index.jsx';
import AddTransaction from '../components/addTransaction/index.jsx';
import AddCategory from '../components/addCategory/index.jsx';
import Profile from '../components/profile/index.jsx';
import Login from '../components/login/index.jsx';

const Routes = [
  {
    path: '/',
    component: Overview,
    exact: true,
    label: 'Dashboard',
    display: true,
  },
  {
    path: '/profile/',
    component: Profile,
    exact: true,
    label: 'My profile',
    display: true,
  },
  {
    path: '/add-transaction',
    component: AddTransaction,
    exact: true,
    label: 'Add transaction',
    display: true,
  },
  {
    path: '/add-category',
    component: AddCategory,
    exact: true,
    label: 'Add category',
    display: true,
  },
  {
    path: '/auth/login/',
    component: Login,
    exact: true,
    label: 'Login',
    display: false,
  },
];

export default Routes;
