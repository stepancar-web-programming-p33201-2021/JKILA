/* eslint-disable */
import React from 'react';
import { render, screen } from '@testing-library/react';
import UserStore from "../store/UserStore";
import WorkspaceStore from "../store/WorkspaceStore";
import ProjectStore from "../store/ProjectStore";
import {Context} from "../index";
import Columns from "../components/Columns";
import {createMemoryHistory} from "history";
import Kanban from "../pages/Kanban";
import {BrowserRouter as Router} from 'react-router-dom';


describe('Kanban', () => {

  it('Column name', () => {
    render(<Columns />)
    expect(screen.getByText(/To Do/i)).toBeInTheDocument();
    expect(screen.getByText(/In Progress/i)).toBeInTheDocument();
    expect(screen.getByText(/Done/i)).toBeInTheDocument();
  });

  it('3 columns', () => {
    render(<Columns />)
    expect(screen.getAllByText('')).toHaveLength(3);
  });

  it('Kanban button text', () => {
    const history = createMemoryHistory();
    const route = '/projects/1';
    history.push(route);
    render(
      <Context.Provider value={{
        user: new UserStore(),
        workspace: new WorkspaceStore(),
        project: new ProjectStore(),
      }}
      >
        <Router history={history}>
          <Kanban />
        </Router>
      </Context.Provider>)
    expect(screen.getByText(/Filters/i)).toBeInTheDocument();
    expect(screen.getByText(/Create Issue/i)).toBeInTheDocument();
  });

  it('no previous "add issue button', () => {
    const history = createMemoryHistory();
    const route = '/projects/1';
    history.push(route);
    render(
      <Context.Provider value={{
        user: new UserStore(),
        workspace: new WorkspaceStore(),
        project: new ProjectStore(),
      }}
      >
        <Router history={history}>
          <Kanban />
        </Router>
      </Context.Provider>)
    expect(screen.queryByText(/Add Issue/i)).not.toBeInTheDocument();
  });

  it('2 buttons on page', () => {
    const history = createMemoryHistory();
    const route = '/projects/1';
    history.push(route);
    render(
      <Context.Provider value={{
        user: new UserStore(),
        workspace: new WorkspaceStore(),
        project: new ProjectStore(),
      }}
      >
        <Router history={history}>
          <Kanban />
        </Router>
      </Context.Provider>)
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it('button "Only my issues" has correct style class', () => {
    const history = createMemoryHistory();
    const route = '/projects/1';
    history.push(route);
    render(
      <Context.Provider value={{
        user: new UserStore(),
        workspace: new WorkspaceStore(),
        project: new ProjectStore(),
      }}
      >
        <Router history={history}>
          <Kanban />
        </Router>
      </Context.Provider>)
    expect(screen.getAllByRole("button")[0]).toHaveClass('btn btn-secondary');
  });
});


