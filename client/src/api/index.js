import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:4000",
});
Api.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getPosts = (page) => Api.get(`/posts?page=${page}`);
export const searchPosts = (searchTerm, tags) =>
  Api.get(
    `/posts/search?search=${!searchTerm ? "none" : searchTerm}&tags=${tags}`
  );
export const addComment = (id, comment) =>
  Api.post(`/posts/${id}/comment`, { comment });
export const createPost = (post) => Api.post("/posts", post);
export const getPost = (id) => Api.get(`/posts/${id}`);
export const updatePost = (id, post) => Api.patch(`/posts/${id}`, post);
export const deletePost = (id) => Api.delete(`/posts/${id}`);
export const likePost = (id) => Api.patch(`/posts/${id}/like`);
export const signup = (form) => Api.post(`/auth/signup`, form);
export const signin = (form) => Api.post(`/auth/signin`, form);
export const signWithGoogle = (code) => Api.post(`/auth/google`, code);
