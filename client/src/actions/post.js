export const setPostToNull = () => {
  return { type: "SET_NULL" };
};

export const setPost = (post) => {
  return { type: "SET_POST", payload: post };
};
