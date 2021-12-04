import { $host } from './index';

export const createComment = async (comment) => {
  const { data } = await $host.post('api/comment', comment);
  return data;
};

export const deleteComment = async (id) => {
  const { data } = await $host.post(`api/comment/${id}`);
  return data;
};

export const fetchComments = async () => {
  const { data } = await $host.get('api/comment');
  return data;
};

export const fetchOneComment = async (id) => {
  const { data } = await $host.get(`api/comment/${id}`);
  return data;
};
