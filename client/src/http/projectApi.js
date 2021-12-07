import { $host } from './index';

export const createProject = async (name, wsId) => {
  const { data } = await $host.post('api/project', {
    name, wsId,
  });
  return data;
};

export const deleteProject = async (id) => {
  const { data } = await $host.post(`api/project/${id}`);
  return data;
};

export const fetchProjects = async (id) => {
  const { data } = await $host.get(`api/project/${id}`);
  return data;
};

// export const fetchOneProject = async (id) => {
//   const { data } = await $host.get(`api/project/${id}`);
//   return data;
// };
