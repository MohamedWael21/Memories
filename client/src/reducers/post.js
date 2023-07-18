const postReducer = (post = null, action) => {
  switch (action.type) {
    case "SET_POST":
      return action.payload;
    case "SET_NULL":
      return null;
    default:
      return post;
  }
};

export default postReducer;
