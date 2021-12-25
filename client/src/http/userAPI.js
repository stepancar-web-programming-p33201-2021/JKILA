import jwtDecode from 'jwt-decode';
import { $authHost, $host } from './index';

export const registration = async (username, fName, lName, password) => {
  const { data } = await $host.post('api/user/registration', {
    username, fName, lName, password, role: 'USER',
  });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const login = async (username, password) => {
  const { data } = await $host.post('api/user/login', { username, password });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get('api/user/auth');
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const fetchUsersByWs = async (id) => {
  const { data } = await $host.get(`api/user/getAllByWs/${id}`);
  return data;
};

export const fetchAssignees = async (id) => {
  const { data } = await $host.get(`api/user/getAssignees/${id}`);
  return data;
};

export const fetchOneUser = async (id) => {
  const { data } = await $host.get(`api/user/getOne/${id}`);
  return data;
};
