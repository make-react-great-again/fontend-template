import { lazy } from 'react';
const Demo1 = lazy(() => import('../../page/auto-test/demo1'));

const routes = [
  {
    path: '/auto-test',
    title: '链融云自动化测试',
    icon: 'desktop',
    children: [
      {
        path: '/demo1',
        title: 'demo1',
        component: Demo1,
      },
    ],
  },
];

export default routes;
