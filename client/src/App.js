import { Container } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { refreshUser } from "./actions/user";
import PostDetail from "./components/PostDetail/PostDetail";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(refreshUser(JSON.parse(localStorage.getItem("user"))));
    }
  }, [dispatch]);

  return (
    <Container maxWidth="xl">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Navigate to="/posts" />} />
          <Route exact path="/posts" element={<Home />} />
          <Route exact path="/posts/:id" element={<PostDetail />} />
          <Route
            exact
            path="/auth"
            element={user ? <Navigate to="/" /> : <Auth />}
          />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
