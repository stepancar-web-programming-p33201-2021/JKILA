import { $host } from './index';

export const createIssue = async (summary, due, project, priority, status, desc, reporter) => {
  const { data } = await $host.post('api/issue', {
    summary, due, project, priority, status, desc, reporter,
  });
  return data;
};

export const updateIssue = async (id, summary, due, status, priority, desc) => {
  const { data } = await $host.post('api/issue/update', {
    id, summary, due, status, priority, desc,
  });
  return data;
};

export const updateIssueStatus = async (id, status) => {
  const { data } = await $host.post('api/issue/upd_status', {
    id, status,
  });
  return data;
};

export const addIssueAssignee = async (username, id) => {
  const { data } = await $host.post('api/issue/assignee', {
    username, id,
  });
  return data;
};

export const addIssueTag = async (tagName, id) => {
  const { data } = await $host.post('api/issue/tag', {
    tagName, id,
  });
  return data;
};

export const deleteIssue = async (id) => {
  const { data } = await $host.post(`api/issue/${id}`);
  return data;
};

export const fetchIssues = async (id) => {
  const { data } = await $host.get(`api/issue/${id}`);
  return data;
};

// export const fetchOneIssue = async (id) => {
//   const { data } = await $host.get(`api/issue/${id}`);
//   return data;
// };
