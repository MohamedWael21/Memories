import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { CircularProgress, Grid, Alert } from "@mui/material";
const Posts = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  if (!posts.length) {
    return <Alert severity="info">No posts</Alert>;
  }
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid container spacing={3} alignItems="stretch" marginBottom={3}>
      {posts.map((post) => (
        <Grid item xs={12} sm={12} md={6} lg={3} key={post._id}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
