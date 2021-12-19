import { $host } from './index';

export const createTag = async (tagName, projectId) => {
  const { data } = await $host.post('api/tag', { tagName, projectId });
  return data;
};

export const deleteTag = async (id) => {
  const { data } = await $host.post(`api/tag/${id}`);
  return data;
};

export const fetchTags = async (id) => {
  const { data } = await $host.get(`api/tag/${id}`);
  return data;
};

/* export const fetchOneTag = async (id) => {
  const { data } = await $host.get(`api/tag/${id}`);
  return data;
}; */
