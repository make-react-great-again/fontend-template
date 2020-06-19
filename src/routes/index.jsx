import { autoAddPathToChildren } from '../js/routes_helper';
import home from './home';
import autoTest from './autoTest';

const routes = autoAddPathToChildren([].concat(home, autoTest));

export default routes;
