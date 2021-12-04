import { $host } from './index';

export const createTag = async (tag) => {
  const { data } = await $host.post('api/tag', tag);
  return data;
};

export const deleteTag = async (id) => {
  const { data } = await $host.post(`api/tag/${id}`);
  return data;
};

export const fetchTags = async () => {
  const { data } = await $host.get('api/tag');
  return data;
};

export const fetchOneTag = async (id) => {
  const { data } = await $host.get(`api/tag/${id}`);
  return data;
};
