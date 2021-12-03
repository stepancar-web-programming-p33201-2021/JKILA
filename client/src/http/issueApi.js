import { $host } from './index';

export const createIssue = async (issue) => {
  const { data } = await $host.post('api/issue', issue);
  return data;
};

export const deleteIssue = async (id) => {
  const { data } = await $host.post(`api/issue/${id}`);
  return data;
};

export const fetchIssues = async () => {
  const { data } = await $host.get('api/issue');
  return data;
};

export const fetchOneIssue = async (id) => {
  const { data } = await $host.get(`api/issue/${id}`);
  return data;
};
