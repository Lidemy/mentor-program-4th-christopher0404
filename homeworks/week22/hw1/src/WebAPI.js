import { getAuthToken } from './utils';

const token = getAuthToken();
const BASE_URL = 'https://student-json-api.lidemy.me';
const contentType = 'application/json';
const sort = 'createdAt';
const order = 'desc';

export const getAllPosts = () =>
  fetch(`${BASE_URL}/posts?_expand=user&_sort=${sort}&_order=${order}`)
    .then(res => res.json());

export const getLimitedPosts = (page) => {
  const limit = 5;
  return fetch(`${BASE_URL}/posts?_expand=user&_sort=${sort}&_order=${order}&_page=${page}&_limit=${limit}`)
}

export const getSinglePost = (id) =>
  fetch(`${BASE_URL}/posts/${id}?_expand=user`)
    .then(res => res.json());

export const getUserPosts = (userId) =>
  fetch(`${BASE_URL}/users/${userId}?_embed=posts`)
    .then(res => res.json());

export const createPost = (payload) => {
  const token = getAuthToken();

  return fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': contentType,
    },
    body: JSON.stringify(payload),
  }).then(res => res.json());
}

export const updatePost = (id, payload) => fetch(`${BASE_URL}/posts/${id}`, {
  method: 'PATCH',
  headers: {
    authorization: `Bearer ${token}`,
    'content-type': contentType,
  },
  body: JSON.stringify(payload),
}).then(res => res.json());

export const deletePost = (id) => fetch(`${BASE_URL}/posts/${id}`, {
  method: 'DELETE',
  headers: {
    authorization: `Bearer ${token}`,
    'content-type': contentType,
  },
}).then(res => res.json());

export const register = ({ nickname, username, password }) => fetch(`${BASE_URL}/register`, {
  method: 'POST',
  headers: {
    'content-type': contentType
  },
  body: JSON.stringify({
    nickname,
    username,
    password,
  })
}).then(res => res.json());

export const login = ({ username, password }) => fetch(`${BASE_URL}/login`, {
  method: 'POST',
  headers: {
    'content-type': contentType,
  },
  body: JSON.stringify({
    username,
    password,
  })
}).then(res => res.json());

export const getMe = () => {
  const token = getAuthToken();

  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(res => res.json());
}
