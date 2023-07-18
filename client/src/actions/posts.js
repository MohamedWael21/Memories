import * as api from "../api/";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await api.getPosts(page);
    dispatch({ type: "FETCH_POSTS", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log(error.response.data);
  }
};
export const getPostsBySearch = (searchTerm, tags) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    console.log(tags);
    const { data } = await api.searchPosts(searchTerm, tags);
    dispatch({ type: "FETCH_POSTS_BY_SEARCH", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: "CREATE_POST", payload: data });
    navigate(`/posts/${data._id}`);
  } catch (error) {
    console.log(error.response.data);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: "UPDATE_POST", payload: data });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: "DELETE_POST", payload: id });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: "UPDATE_POST", payload: data });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const fetchPost = (id) => async (dispatch) => {
  try {
    const { data } = await api.getPost(id);
    dispatch({ type: "FETCH_POST", payload: data });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const addComment = (id, comment) => async (dispatch) => {
  try {
    const { data } = await api.addComment(id, comment);
    dispatch({ type: "ADD_COMMENT", payload: data });
    return data.comments;
  } catch (error) {
    console.log(error.response.data);
  }
};
