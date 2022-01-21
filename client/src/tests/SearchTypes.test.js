/* eslint-disable */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Workspaces from '../pages/Workspaces';
import UserStore from "../store/UserStore";
import WorkspaceStore from "../store/WorkspaceStore";
import ProjectStore from "../store/ProjectStore";
import {Context} from "../index";
import Columns from "../components/Columns";


describe('Text for user', () => {
  it('Workspaces', () => {
    render(
      <Context.Provider value={{
        user: new UserStore(),
        workspace: new WorkspaceStore(),
        project: new ProjectStore(),
      }}
      >
        <Workspaces />
      </Context.Provider>)
    expect(screen.getByText(/Join Workspace/i)).toBeInTheDocument();
  });

  it('Columns', () => {
    render(<Columns />)
    expect(screen.getByText(/To Do/i)).toBeInTheDocument();
    expect(screen.getByText(/In Progress/i)).toBeInTheDocument();
    expect(screen.getByText(/Done/i)).toBeInTheDocument();
  });
});


