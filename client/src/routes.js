import {
  BOARD, LOGIN_ROUTE, PROJECTS, REGISTRATION_ROUTE, WORKSPACES,
} from './utils/consts';
import Kanban from './pages/Kanban';
import Auth from './pages/Auth';
import Projects from './pages/Projects';
import Workspaces from './pages/Workspaces';

export const authRoutes = [
  {
    path: BOARD,
    Component: Kanban,
  },
  {
    path: PROJECTS,
    Component: Projects,
  },
  {
    path: WORKSPACES,
    Component: Workspaces,
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
