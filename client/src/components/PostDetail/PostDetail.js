import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../../actions/posts";
import { getPostsBySearch } from "../../actions/posts";
import {
  Box,
  CircularProgress,
  Paper,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import styles from "./styles";
import moment from "moment";
import CommentSection from "./CommentSection/CommentSection";
const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { posts, post } = useSelector((state) => state.posts);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchPost(id));
  }, [id, dispatch]);
  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch("none", post?.tags.join(",")));
    }
  }, [post, dispatch]);

  const openPost = (id) => navigate(`/posts/${id}`);

  if (!post) {
    return (
      <Paper elevation={6} sx={styles.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts?.filter(({ _id }) => _id !== post._id);
  console.log(recommendedPosts);
  return (
    <Paper elevation={6} sx={styles.wrapperPaper}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={8} lg={6}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.creatorName}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </Grid>
        <Grid item sm={12} md={4} lg={6}>
          <img
            style={styles.media}
            alt={post.title}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
          />
        </Grid>
      </Grid>
      {!!recommendedPosts.length && (
        <Box sx={styles.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <Box sx={styles.recommendedPosts}>
            {recommendedPosts.map(
              ({ title, name, message, likes, selectedFile, _id }) => (
                <Box
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                  <img
                    src={
                      selectedFile ||
                      "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                    }
                    width="200px"
                    alt={title}
                  />
                </Box>
              )
            )}
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default PostDetail;
