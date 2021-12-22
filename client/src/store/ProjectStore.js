import { makeAutoObservable } from 'mobx';

export default class ProjectStore {
  constructor() {
    this._project = {};
    this._projects = [];
    this._issues = [];
    this._users = [];
    this._tags = [];
    this._myFilter = null;
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

  setTags(value) {
    this._tags = value;
  }

  setMyFilter(value) {
    this._myFilter = value;
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

  get tags() {
    return this._tags;
  }

  get myFilter() {
    return this._myFilter;
  }
}
