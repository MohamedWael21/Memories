import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import {
  Button,
  Card,
  CardContent,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { setPostToNull } from "../../actions/post";
import { useNavigate } from "react-router-dom";
const initalState = {
  title: "",
  tags: "",
  selectedFile: "",
  message: "",
};
const Form = () => {
  const classes = useStyles();
  const [form, setForm] = useState(initalState);
  const post = useSelector((state) => state.post);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setForm({
        title: post.title,
        creator: post.creator,
        tags: post.tags.join(","),
        message: post.message,
      });
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) {
      formData.set(key, form[key]);
    }
    if (post) {
      dispatch(updatePost(post._id, formData));
    } else {
      formData.set("creator", user._id);
      formData.set("creatorName", user.name);
      dispatch(createPost(formData, navigate));
    }
    setForm(initalState);
    dispatch(setPostToNull());
  };
  const clear = () => {
    setForm(initalState);
    dispatch(setPostToNull());
  };
  if (!user) {
    return (
      <Card elevation={6}>
        <CardContent>
          <Typography variant="body1">
            Please sign in to create your own memories and like ohter's memories
          </Typography>
        </CardContent>
      </Card>
    );
  }
  return (
    <Paper className={`${classes.paper}`} elevation={6}>
      <form
        className={`${classes.form}`}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Typography variant="h6" marginBottom=".8rem">
          {" "}
          {post ? `Editing ${post.title}` : "Createing a Memory"}
        </Typography>
        <TextField
          className={classes.textField}
          variant="outlined"
          label="Title"
          fullWidth
          value={form.title}
          onChange={(e) => {
            setForm({ ...form, title: e.target.value });
          }}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          label="Message"
          fullWidth
          value={form.message}
          multiline
          rows={4}
          onChange={(e) => {
            setForm({ ...form, message: e.target.value });
          }}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          label="Tags (coma separted)"
          fullWidth
          value={form.tags}
          onChange={(e) => {
            setForm({ ...form, tags: e.target.value });
          }}
        />
        <div className={classes.fileInput}>
          <Button variant="contained" component="label" fullWidth>
            Upload File
            <input
              type="file"
              hidden
              name="selectedFile"
              onChange={(e) => {
                form.selectedFile = e.target.files[0];
              }}
            />
          </Button>
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          fullWidth
          color="primary"
          type="submit"
        >
          Submit
        </Button>
        <Button variant="contained" fullWidth color="secondary" onClick={clear}>
          clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
