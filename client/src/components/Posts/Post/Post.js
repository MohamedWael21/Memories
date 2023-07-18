import {
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { setPost } from "../../../actions/post";
import { deletePost, likePost } from "../../../actions/posts";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const Post = ({ post }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleUpdate = () => {
    dispatch(setPost(post));
  };
  const like = () => {
    dispatch(likePost(post._id));
  };
  const removePost = () => {
    dispatch(deletePost(post._id));
  };
  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };
  return (
    <Card sx={{ minHeight: "100%" }} elevation={6}>
      <CardHeader
        title={post.creatorName}
        subheader={moment(post.createdAt).fromNow()}
        action={
          user?._id === post.creator ? (
            <IconButton onClick={handleUpdate}>
              <MoreVertIcon />
            </IconButton>
          ) : (
            ""
          )
        }
      />
      <ButtonBase sx={{ width: "100%" }} onClick={openPost}>
        <CardMedia
          component="img"
          src={
            post.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          alt="post image"
          title={post.title}
          height="200px"
        />
      </ButtonBase>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.tags?.map((tag) => `#${tag.trim()} `)}
        </Typography>
        <Typography variant="h5" marginBottom="10px" marginTop="10px">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <IconButton onClick={like} disabled={!Boolean(user)} color="primary">
          {post.likes?.includes(user?._id) ? (
            <ThumbUpIcon />
          ) : (
            <ThumbUpOffAltIcon />
          )}
          <span style={{ marginLeft: "5px", fontSize: "16px" }}>
            {post.likes?.length}
          </span>
        </IconButton>
        {user?._id === post.creator && (
          <IconButton onClick={removePost}>
            <DeleteOutlineIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
