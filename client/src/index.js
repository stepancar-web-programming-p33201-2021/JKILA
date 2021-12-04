import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from './store/UserStore';
import WorkspaceStore from './store/WorkspaceStore';

// eslint-disable-next-line import/prefer-default-export
export const Context = createContext(null);

ReactDOM.render(
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  <Context.Provider value={{
    user: new UserStore(),
    workspace: new WorkspaceStore(),
  }}
  >
    <App />
  </Context.Provider>,
  document.getElementById('root'),
);
