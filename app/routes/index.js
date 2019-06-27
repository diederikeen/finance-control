import Overview from '../components/overview/index.jsx';
import Login from '../components/login/index.jsx';

const Routes = [
  {
    path: '/',
    component: Overview,
    exact: true,
    label: 'Home',
    display: false,
  },
  // {
  //   path: '/login',
  //   component: Login,
  //   exact: true,
  //   label: 'Loguit',
  // },
];

export default Routes;
