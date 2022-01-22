/* eslint-disable */
import React from 'react';
import { render, screen } from '@testing-library/react';
import UserStore from "../store/UserStore";
import WorkspaceStore from "../store/WorkspaceStore";
import ProjectStore from "../store/ProjectStore";
import {Context} from "../index";
import {createMemoryHistory} from "history";
import {BrowserRouter as Router} from "react-router-dom";
import Auth from "../pages/Auth";



describe('Auth', () => {

  it('all text on  page', () => {
    const history = createMemoryHistory();
    const route = '/registration';
    history.push(route);
    render(
      <Context.Provider value={{
        user: new UserStore(),
        workspace: new WorkspaceStore(),
        project: new ProjectStore(),
      }}
      >
        <Router history={history}>
          <Auth />
        </Router>
      </Context.Provider>)
    expect(screen.getAllByText(/Регистрация/i)).toHaveLength(2);
    expect(screen.getByText(/Есть аккаунт/i)).toBeInTheDocument();
    expect(screen.getByText(/Войдите!/i)).toBeInTheDocument();
  });

  it('4 fields for registration', () => {
    const history = createMemoryHistory();
    const route = '/registration';
    history.push(route);
    render(
      <Context.Provider value={{
        user: new UserStore(),
        workspace: new WorkspaceStore(),
        project: new ProjectStore(),
      }}
      >
        <Router history={history}>
          <Auth />
        </Router>
      </Context.Provider>)
    expect(screen.getAllByRole("textbox")).toHaveLength(3);
    expect(screen.getAllByPlaceholderText("Введите имя...")).toHaveLength(1);
    expect(screen.getByPlaceholderText("Введите имя...")).toHaveClass("mt-3 form-control");
    expect(screen.getAllByPlaceholderText("Введите фамилию...")).toHaveLength(1);
    expect(screen.getByPlaceholderText("Введите фамилию...")).toHaveClass("mt-3 form-control");
    expect(screen.getAllByPlaceholderText("Введите username...")).toHaveLength(1);
    expect(screen.getByPlaceholderText("Введите username...")).toHaveClass("mt-3 form-control");
    expect(screen.getAllByPlaceholderText("Введите пароль...")).toHaveLength(1);
    expect(screen.getByPlaceholderText("Введите пароль...")).toHaveClass("mt-3 form-control");
  });

  it('no sign in button, only register button', () => {
    const history = createMemoryHistory();
    const route = '/registration';
    history.push(route);
    render(
      <Context.Provider value={{
        user: new UserStore(),
        workspace: new WorkspaceStore(),
        project: new ProjectStore(),
      }}
      >
        <Router history={history}>
          <Auth />
        </Router>
      </Context.Provider>)
    expect(screen.queryByRole("button")).not.toHaveTextContent("Войти");
    expect(screen.queryByRole("button")).toHaveTextContent("Регистрация");
  });

});
