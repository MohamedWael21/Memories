import { Paper, Stack, TextField, Button, Box } from "@mui/material";
import React, { useState } from "react";
import ChipInput from "material-ui-chip-input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../../actions/posts";
const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchPosts = () => {
    if (!searchTerm.trim() && !tags.length) {
      navigate("/posts");
    } else {
      dispatch(getPostsBySearch(searchTerm, tags.join(",")));
      setTags([]);
      setSearchTerm("");
      navigate(`/posts?search=${searchTerm}&tags=${tags.join(",")}`);
    }
  };
  const handleSubmit = () => {
    searchPosts();
  };
  const handlePress = (e) => {
    if (e.key === "Enter") {
      searchPosts();
    }
  };
  return (
    <Paper elevation={6} sx={{ p: ".8rem" }}>
      <Box>
        <Stack spacing={3}>
          <TextField
            name="searchTerm"
            value={searchTerm}
            label="Search memory"
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            onKeyDown={handlePress}
          />
          <ChipInput
            value={tags}
            label="Search tags"
            onAdd={(tag) => setTags([...tags, tag.trim()])}
            onDelete={(tag) => setTags(tags.filter((t) => t !== tag))}
            variant="outlined"
            fullWidth
          />
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Search
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default SearchForm;
