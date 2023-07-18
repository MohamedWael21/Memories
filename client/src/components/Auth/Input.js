import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
const Input = ({
  name,
  type,
  handleChange,
  value,
  label,
  handleShowPassword,
  half,
  ...rest
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        type={type}
        onChange={handleChange}
        fullWidth
        value={value}
        label={label}
        required
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                        {type === 'password' ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
        autoComplete="off"
        {...rest}
      />
    </Grid>
  );
};

export default Input;
