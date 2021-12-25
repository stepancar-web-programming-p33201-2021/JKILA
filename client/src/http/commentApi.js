import { $host } from './index';

export const createComment = async (body, author, issue) => {
  const { data } = await $host.post('api/comment', { body, author, issue });
  return data;
};

export const destroyComment = async (id) => {
  const { data } = await $host.post(`api/comment/del/${id}`);
  return data;
};

export const updateComment = async (id, body) => {
  const { data } = await $host.post(`api/comment/update/${id}`, { body });
  return data;
};

export const fetchComments = async (id) => {
  const { data } = await $host.get(`api/comment/${id}`);
  return data;
};
