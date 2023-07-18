import React from "react";
import { Grow, Container, Grid, Stack } from "@mui/material";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination/Pagination";
import { useLocation } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";

const Home = () => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const page = query.get("page") ?? 1;
  const tags = query.get("tags");
  const search = query.get("search");
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
          justifyContent="space-between"
          sx={{
            flexDirection: { xs: "column-reverse", sm: "row" },
          }}
        >
          <Grid item xs={12} sm={6} md={8}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Stack spacing={3}>
              <SearchForm />
              <Form />
              {!tags && !search && <Pagination page={page} />}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
