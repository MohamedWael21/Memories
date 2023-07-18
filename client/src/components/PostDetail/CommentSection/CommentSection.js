import React, { useEffect, useState } from "react";
import {
  Stack,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../../actions/posts";
const CommentSection = ({ post }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.comments);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    setComments(post?.comments);
  }, [post]);
  const dispatch = useDispatch();
  const handleComment = async (e) => {
    const newComment = `${user.name}: ${comment}`;
    const newComments = await dispatch(addComment(post._id, newComment));
    setComment("");
    setComments(newComments);
  };
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
      <Box
        sx={{
          height: "200px",
          overflowY: "scroll",
          width: "200px",
          scrollBehavior: "smooth",
        }}
      >
        <Typography gutterBottom variant="h6">
          comments
        </Typography>
        {comments?.map((comment, index) => (
          <Typography gutterBottom key={index} variant="subtitle1">
            <strong>{comment.split(": ")[0]}</strong>:{comment.split(":")[1]}
          </Typography>
        ))}
      </Box>
      {user ? (
        <Stack spacing={2} sx={{ flex: "1" }}>
          <Typography variant="h6">Write a comment</Typography>
          <TextField
            multiline
            rows={4}
            variant="outlined"
            label="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={!comment}
            onClick={handleComment}
          >
            Comment
          </Button>
        </Stack>
      ) : (
        <Alert severity="info">You must signin to write comment</Alert>
      )}
    </Box>
  );
};

export default CommentSection;
