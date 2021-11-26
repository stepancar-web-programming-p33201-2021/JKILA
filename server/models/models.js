const { DataTypes } = require('sequelize');
const pool = require('../db');

const User = pool.define('user', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  username: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  active: { type: DataTypes.BOOLEAN },
  role: { type: DataTypes.ENUM('USER', 'ADMIN') },
});

const Issue = pool.define('issue', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  creation_date: { type: DataTypes.DATE },
  due_date: { type: DataTypes.DATE },
  summary: { type: DataTypes.STRING },
  priority: { type: DataTypes.ENUM('Lowest', 'Low', 'Medium', 'High', 'Highest') },
  // status: { type: DataTypes.ENUM('To Do', 'Doing', 'Done') },
});

const Project = pool.define('project', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  proj_name: { type: DataTypes.STRING, allowNull: false },
});

const Workspace = pool.define('workspace', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  workspace_name: { type: DataTypes.STRING, unique: true, allowNull: false },
  creation_date: { type: DataTypes.DATE },
  description: { type: DataTypes.TEXT },
});

const Tag = pool.define('tag', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  tag_name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

// Relationship tables

const IssueAssignee = pool.define('issue_assignee', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
});

const IssueTags = pool.define('issue_assignee', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
});

const WorkspaceUsers = pool.define('works_users', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
});

const ProjectUsersRoles = pool.define('project_users_roles', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  role_name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

// Relations between tables
Project.hasMany(Issue, { foreignKey: 'project_id' });
Issue.belongsTo(Project, { foreignKey: 'project_id' });

User.hasMany(Issue, { foreignKey: 'creator_id' });
Issue.belongsTo(User, { foreignKey: 'creator_id' });

Workspace.hasMany(Project, { foreignKey: 'ws_id' });
Project.belongsTo(Workspace, { foreignKey: 'ws_id' });

// Super Many-to-Many relationships
// Issue - User
User.belongsToMany(Issue, { through: IssueAssignee });
Issue.belongsToMany(User, { through: IssueAssignee });
IssueAssignee.belongsTo(Issue);
IssueAssignee.belongsTo(User);
Issue.hasMany(IssueAssignee);
User.hasMany(IssueAssignee);

// Issue - Tags
Issue.belongsToMany(Tag, { through: IssueTags });
Tag.belongsToMany(Issue, { through: IssueTags });
IssueTags.belongsTo(Issue);
IssueTags.belongsTo(Tag);
Issue.hasMany(IssueTags);
Tag.hasMany(IssueTags);

// Workspace - User
Workspace.belongsToMany(User, { through: WorkspaceUsers });
User.belongsToMany(Workspace, { through: WorkspaceUsers });
WorkspaceUsers.belongsTo(Workspace);
WorkspaceUsers.belongsTo(User);
Workspace.hasMany(WorkspaceUsers);
User.hasMany(WorkspaceUsers);

// Many-to-Many-to-Many relation
Project.belongsToMany(User, { through: ProjectUsersRoles });
User.belongsToMany(Project, { through: ProjectUsersRoles });

module.exports = {
  User,
  Issue,
  Project,
  Workspace,
  Tag,
  IssueAssignee,
  IssueTags,
  WorkspaceUsers,
  ProjectUsersRoles,
};
