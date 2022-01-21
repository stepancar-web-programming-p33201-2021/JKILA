/* eslint-disable */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Workspaces from '../pages/Workspaces';
import UserStore from "../store/UserStore";
import WorkspaceStore from "../store/WorkspaceStore";
import ProjectStore from "../store/ProjectStore";
import {Context} from "../index";


describe('Workspaces', () => {

  it('Join Workspace text', () => {
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

  it('1 button', () => {
    render(
      <Context.Provider value={{
        user: new UserStore(),
        workspace: new WorkspaceStore(),
        project: new ProjectStore(),
      }}
      >
        <Workspaces />
      </Context.Provider>)
    expect(screen.getAllByRole("button")).toHaveLength(1);
  });

  it('button has needed class style', () => {
    render(
      <Context.Provider value={{
        user: new UserStore(),
        workspace: new WorkspaceStore(),
        project: new ProjectStore(),
      }}
      >
        <Workspaces />
      </Context.Provider>)
    expect(screen.getByRole("button")).toHaveClass('mb-3 btn btn-outline-warning');
  });


});