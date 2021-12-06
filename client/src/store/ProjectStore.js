import { makeAutoObservable } from 'mobx';

export default class ProjectStore {
  constructor() {
    this._projects = [];
    this._issues = [];
    makeAutoObservable(this);
  }

  setProjects(value) {
    this._projects = value;
  }

  setIssues(value) {
    this._issues = value;
  }

  get projects() {
    return this._projects;
  }

  get issues() {
    return this._issues;
  }
}
