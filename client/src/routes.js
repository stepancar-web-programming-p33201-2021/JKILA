import {
  BOARD, LOGIN_ROUTE, PROJECTS, REGISTRATION_ROUTE, WORKSPACES, ISSUE,
} from './utils/consts';
import Kanban from './pages/Kanban';
import Auth from './pages/Auth';
import Projects from './pages/Projects';
import Workspaces from './pages/Workspaces';
import Issue from './pages/Issue';

export const authRoutes = [
  {
    path: `${BOARD}/:id`,
    Component: Kanban,
  },
  {
    path: `${PROJECTS}/:id`,
    Component: Projects,
  },
  {
    path: WORKSPACES,
    Component: Workspaces,
  },
  {
    path: ISSUE,
    Component: Issue,
  },
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
];
