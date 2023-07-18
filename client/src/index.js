import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import PostsReducer from "./reducers/posts";
import PostReducer from "./reducers/post";
import UserReducer from "./reducers/user";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = createTheme();

const store = configureStore({
  reducer: {
    posts: PostsReducer,
    post: PostReducer,
    user: UserReducer,
  },
});

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1000276694724-7s4jjjtdvdojme1m7v81ur3cqg94vmtc.apps.googleusercontent.com">
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline />
          <App />
        </Provider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
