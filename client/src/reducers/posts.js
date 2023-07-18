const postsReducer = (state = { posts: [], isLoading: true }, action) => {
  switch (action.type) {
    case "FETCH_POSTS":
      return {
        ...state,
        posts: action.payload.posts,
        numberOfPages: action.payload.numberOfPages,
        currentPage: action.payload.currentPage,
      };
    case "FETCH_POSTS_BY_SEARCH":
      return { ...state, posts: action.payload };
    case "CREATE_POST":
      return { ...state, posts: [action.payload, ...state.posts] };
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case "FETCH_POST":
      return {
        ...state,
        post: action.payload,
      };
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "END_LOADING":
      return { ...state, isLoading: false };
    case "ADD_COMMENT":
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (action.payload._id === post._id) {
            return action.payload;
          }
          return post;
        }),
      };
    default:
      return state;
  }
};

export default postsReducer;
