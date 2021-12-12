import { makeAutoObservable } from 'mobx';

export default class ProjectStore {
  constructor() {
    this._project = {};
    this._projects = [];
    this._issues = [];
    this._users = [];
    makeAutoObservable(this);
  }

  setProjects(value) {
    this._projects = value;
  }

  setIssues(value) {
    this._issues = value;
  }

  setProject(value) {
    this._project = value;
  }

  setUsers(value) {
    this._users = value;
  }

  get projects() {
    return this._projects;
  }

  get issues() {
    return this._issues;
  }

  get project() {
    return this._project;
  }

  get users() {
    return this._users;
  }
}
