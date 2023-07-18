import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PaginationItem,
  Pagination as PaginationMui,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
const Pagination = ({ page }) => {
  const { isLoading, currentPage, numberOfPages } = useSelector(
    (state) => state.posts
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [dispatch, page]);
  if (isLoading) {
    return;
  }
  return (
    <Paper elevation={6} sx={{ p: ".8rem" }}>
      <PaginationMui
        count={numberOfPages}
        color="primary"
        page={+currentPage}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/posts?page=${item.page}`}
            {...item}
          />
        )}
      />
    </Paper>
  );
};

export default Pagination;
