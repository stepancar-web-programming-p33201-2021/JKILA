import { $host } from './index';

export const createComment = async (body, author, issue) => {
  const { data } = await $host.post('api/comment', { body, author, issue });
  return data;
};

export const deleteComment = async (id) => {
  const { data } = await $host.post(`api/comment/del/${id}`);
  return data;
};

export const fetchComments = async (id) => {
  const { data } = await $host.get(`api/comment/${id}`);
  return data;
};
