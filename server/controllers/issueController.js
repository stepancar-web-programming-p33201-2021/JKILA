const {
  Issue, User, Tag, IssueAssignee, IssueTags,
} = require('../models/models');
const customError = require('../error/customError');

async function create(req, res) {
  const {
    summary, due, priority, status, project, desc, reporter,
  } = req.body;
  const issue = await Issue.create({
    summary,
    due_date: due,
    priority,
    status,
    project_id: project,
    description: desc,
    reporter_id: reporter,
  });
  return res.json(issue);
}

async function destroy(req, res) {
  const { id } = req.params;
  await Issue.destroy({ where: { id } });
  return res.json({ message: `Issue with ID = ${id} deleted` });
}

async function update(req, res) {
  const {
    id, summary, due, status, priority, desc,
  } = req.body;
  await Issue.update({
    due_date: due,
    status,
    summary,
    priority,
    description: desc,
  }, { where: { id } });
  return res.json({ message: `Issue with ID = ${id} updated` });
}

async function updateStatus(req, res) {
  const { id, status } = req.body;
  await Issue.update({ status }, { where: { id } });
  return res.json({ message: `Issue with ID = ${id} updated` });
}

async function addAssignee(req, res) {
  const { username, id } = req.body;
  const issue = await Issue.findOne({ where: { id } });
  const user = await User.findOne({ where: { username } });
  await issue.addUser(user);
  return res.json(issue);
}

async function addTag(req, res) {
  const { tagName, id } = req.body;
  const issue = await Issue.findOne({ where: { id } });
  const tag = await Tag.findOne({ where: { tag_name: tagName, project_id: issue.project_id } });
  await issue.addTag(tag);
  return res.json(issue);
}

async function destroyIssueTags(req, res) {
  const { id } = req.body;
  await IssueTags.destroy({ where: { issueId: id } });
  return res.json({ message: `Tags deleted` });
}


async function destroyIssueAssignees(req, res) {
  const { id } = req.body;
  await IssueAssignee.destroy({ where: { issueId: id } });
  return res.json({ message: `Assignees deleted` });
}

async function getAll(req, res) {
  const { myFilter } = req.query;
  const { id } = req.params;
  let issues;
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  console.log(myFilter);
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  if (myFilter === undefined) {
    issues = await Issue.findAll({ where: { project_id: id } });
  } else {
    issues = await Issue.findAll({
      where: {
        project_id: id,
      },
      include: [{
        model: IssueAssignee,
        where: {
          userId: myFilter,
        },
      }],
    });
  }

  // if (!priority && !status) {
  //   issues = await Issue.findAll({ where: { project_id: id } });
  // }
  // if (priority && !status) {
  //   issues = await Issue.findAll({ where: { priority, project_id: id } });
  // }
  // if (!priority && status) {
  //   issues = await Issue.findAll({ where: { status, project_id: id } });
  // }
  // if (priority && status) {
  //   issues = await Issue.findAll({ where: { priority, status, project_id: id } });
  // }
  return res.json(issues);
}

async function getOne(req, res, next) {
  const { id } = req.params;
  const issue = await Issue.findOne({ where: { id } });
  if (issue === null) {
    return next(customError.badRequest('There is no ISSUE with this ID'));
  }
  return res.json(issue);
}

module.exports = {
  create,
  update,
  updateStatus,
  getOne,
  getAll,
  destroy,
  addAssignee,
  addTag,
  destroyIssueTags,
  destroyIssueAssignees,
};
