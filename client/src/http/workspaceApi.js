import { $host } from './index';

export const createWorkspace = async (name, desc, code) => {
  const { data } = await $host.post('api/workspace', {
    name, desc, code,
  });
  return data;
};

export const deleteWorkspace = async (id) => {
  const { data } = await $host.post(`api/workspace/${id}`);
  return data;
};

export const joinWorkspace = async (id, code) => {
  const { data } = await $host.post('api/workspace/join', {
    id, code,
  });
  return data;
};

export const fetchWorkspaces = async () => {
  const { data } = await $host.get('api/workspace');
  return data;
};

export const fetchOneWorkspace = async (id) => {
  const { data } = await $host.get(`api/workspace/${id}`);
  return data;
};
