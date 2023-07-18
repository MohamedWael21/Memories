import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import Icon from "./Icon";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { signWithGoogle, signup, signin } from "../../actions/user";

const initalState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [isSignUp, setIsSignup] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(initalState);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const switchForm = () => {
    setIsSignup(!isSignUp);
    setShowPassword(false);
    setForm(initalState);
    setError(null);
  };

  const googleError = (error) => {
    console.log(error);
  };

  const googleSuccess = async ({ code }) => {
    dispatch(signWithGoogle({ code }));
  };

  const login = useGoogleLogin({
    onSuccess: googleSuccess,
    onError: googleError,
    flow: "auth-code",
  });

  const handleShowPassword = (e) => {
    setShowPassword(!showPassword);
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (form.confirmPassword !== form.password) {
        setError("Not matching passwords");
        return;
      }
      dispatch(
        signup({
          name: `${form.firstName} ${form.lastName}`,
          password: form.password,
          email: form.email,
        })
      );
    } else {
      dispatch(
        signin({
          password: form.password,
          email: form.email,
        })
      );
    }
  };
  return (
    <Container maxWidth="xs" sx={{ marginBottom: 2 }}>
      <Paper
        sx={{
          p: 2,
        }}
        elevation={6}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px",
            marginBottom: 2,
          }}
        >
          <Avatar sx={{ backgroundColor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Box>
            <Typography variant="h6">
              {isSignUp ? "Sign Up" : "Sign In"}
            </Typography>
          </Box>
        </Box>
        <Box>
          <form>
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  <Input
                    name="firstName"
                    half
                    label="First Name"
                    type="text"
                    handleChange={handleInput}
                    value={form.firstName}
                  />
                  <Input
                    name="lastName"
                    half
                    label="last Name"
                    type="text"
                    handleChange={handleInput}
                    value={form.lastName}
                  />
                </>
              )}
              <Input
                name="email"
                label="Email"
                type="email"
                handleChange={handleInput}
                value={form.email}
              />
              <Input
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
                handleChange={handleInput}
                value={form.password}
              />
              {isSignUp && (
                <Input
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  handleChange={handleInput}
                  value={form.confirmPassword}
                  error={Boolean(error)}
                  helperText={error}
                />
              )}
              <Grid item xs={12}>
                <Button
                  onClick={() => login()}
                  color="primary"
                  fullWidth
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google Sign In
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSubmit}
                >
                  {isSignUp ? "Sign Up" : "Sign In"}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  sx={{
                    textTransform: "uppercase",
                    "&.MuiButton-text": {
                      color: "text.secondary",
                    },
                  }}
                  fullWidth
                  onClick={switchForm}
                >
                  {isSignUp
                    ? "already have an account? sign in"
                    : "don't have an account? sign up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default Auth;
