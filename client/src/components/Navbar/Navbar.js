import React from "react";
import {
  AppBar,
  Typography,
  Avatar,
  Box,
  Button,
  Toolbar,
} from "@mui/material";
import LogoImage from "../../images/memoriesLogo.png";
import LogoText from "../../images/memoriesText.png";
import styles from "./styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/user";
const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <AppBar sx={styles.appBar} position="static" color="inherit">
      <Box sx={styles.brandContainer}>
        {/* <Typography
          component={Link}
          to="/"
          sx={styles.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography> */}
        <Link to="/posts">
          <img src={LogoText} alt="logotext" height="45px" />
        </Link>
        <Box sx={styles.image}>
          <img src={LogoImage} alt="logoimage" height="40px" />
        </Box>
      </Box>
      <Toolbar sx={styles.toolbar}>
        {user ? (
          <Box sx={styles.profile}>
            <Avatar sx={styles.purple} alt={user?.name} src={user?.picture}>
              {user?.name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography sx={styles.userName} variant="h6">
              {user?.name}
            </Typography>
            <Button
              variant="contained"
              sx={styles.logout}
              color="secondary"
              onClick={() => dispatch(logout())}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
