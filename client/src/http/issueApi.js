import { $host } from './index';

export const createIssue = async (summary, project, priority, status, desc) => {
  const { data } = await $host.post('api/issue', {
    summary, project, priority, status, desc,
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
