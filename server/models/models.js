const { DataTypes } = require('sequelize');
const pool = require('../libs/db');

const User = pool.define('user', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  username: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  active: { type: DataTypes.BOOLEAN, defaultValue: true },
  role: { type: DataTypes.ENUM('USER', 'ADMIN'), defaultValue: 'USER' },
});

const Issue = pool.define('issue', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  due_date: { type: DataTypes.DATE },
  summary: { type: DataTypes.STRING },
  priority: { type: DataTypes.ENUM('Lowest', 'Low', 'Medium', 'High', 'Highest'), defaultValue: 'Low' },
  status: { type: DataTypes.ENUM('To Do', 'In Progress', 'Done'), defaultValue: 'To Do' },
});

const Project = pool.define('project', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  proj_name: { type: DataTypes.STRING, allowNull: false },
  // TODO
  // logo NN
});

const Workspace = pool.define('workspace', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  workspace_name: { type: DataTypes.STRING, unique: true, allowNull: false },
  description: { type: DataTypes.TEXT },
  // TODO
  // logo NN
});

const Tag = pool.define('tag', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  tag_name: { type: DataTypes.STRING, allowNull: false },
});

const Comment = pool.define('comment', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  body: { type: DataTypes.STRING, allowNull: false },
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

const ProjectUsers = pool.define('project_users', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
});

const ProjectTags = pool.define('project_tags', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
});

// Relations between tables

Project.hasMany(Issue, { foreignKey: 'project_id' });
Issue.belongsTo(Project, { foreignKey: 'project_id' });

User.hasMany(Issue, { foreignKey: 'creator_id' });
Issue.belongsTo(User, { foreignKey: 'creator_id' });

Workspace.hasMany(Project, { foreignKey: 'ws_id' });
Project.belongsTo(Workspace, { foreignKey: 'ws_id' });

Issue.hasMany(Comment, { foreignKey: 'issue_id' });
Comment.belongsTo(Issue, { foreignKey: 'issue_id' });

User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

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

// Project - User
Project.belongsToMany(User, { through: ProjectUsers });
User.belongsToMany(Project, { through: ProjectUsers });
WorkspaceUsers.belongsTo(Project);
WorkspaceUsers.belongsTo(User);
Project.hasMany(WorkspaceUsers);
User.hasMany(WorkspaceUsers);

// Project - Tag
Project.belongsToMany(Tag, { through: ProjectTags });
Tag.belongsToMany(Project, { through: ProjectTags });
WorkspaceUsers.belongsTo(Project);
WorkspaceUsers.belongsTo(Tag);
Project.hasMany(WorkspaceUsers);
Tag.hasMany(WorkspaceUsers);

module.exports = {
  User,
  Issue,
  Project,
  Workspace,
  Tag,
  Comment,
  IssueAssignee,
  IssueTags,
  WorkspaceUsers,
  ProjectUsers,
};
