import { makeAutoObservable } from 'mobx';

export default class WorkspaceStore {
  constructor() {
    this._workspaces = [];
    this._projects = [];
    makeAutoObservable(this);
  }

  setWorkspaces(value) {
    this._workspaces = value;
  }

  setProjects(value) {
    this._projects = value;
  }

  get workspaces() {
    return this._workspaces;
  }

  get projects() {
    return this._projects;
  }
}
