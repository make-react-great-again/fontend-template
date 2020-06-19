import { lazy } from 'react';
const Home = lazy(() => import('../../page/home'));

const routes = [
  {
    path: '/',
    title: '首页',
    component: Home,
  },
];

export default routes;
