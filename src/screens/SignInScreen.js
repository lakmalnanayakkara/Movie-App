import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SignInScreen() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState({ username: "", password: "" });
  const [touched, setTouched] = useState({ username: false, password: false });

  const validateField = (name, value) => {
    let error = "";

    if (name === "username") {
      if (!value) {
        error = "Username is required";
      } else if (!/\S+@\S/.test(value)) {
        error = "Username is invalid";
      }
    }

    if (name === "password") {
      if (!value) {
        error = "Password is required";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters";
      }
    }

    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      console.log("checked");
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = ["username", "password"];
    const allTouched = {};
    fields.forEach((field) => {
      allTouched[field] = true;
      validateField(field, formValues[field]);
    });
    setTouched(allTouched);

    if (!Object.values(formErrors).some((error) => error)) {
      console.log("Form submitted:", formValues);
      navigate("/movies");
    }
  };

  const isFormValid = () => {
    return (
      formValues.username &&
      formValues.password &&
      !formErrors.username &&
      !formErrors.password
    );
  };

  return (
    <Container className="d-flex flex-wrap flex-row w-100 align-items-center justify-content-center mt-4">
      <Box className="d-flex flex-column col-md-6 align-items-center">
        <Typography variant="h3">Sign In</Typography>
        <form className="d-flex flex-column w-100" onSubmit={handleSubmit}>
          <TextField
            className="mt-4"
            variant="standard"
            label="Username"
            name="username"
            type="text"
            value={formValues.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!formErrors.username}
            helperText={formErrors.username}
          ></TextField>
          <TextField
            className="mt-4"
            variant="standard"
            label="Password"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!formErrors.password}
            helperText={formErrors.password}
          ></TextField>
          <Button
            variant="contained"
            type="submit"
            className="mt-4"
            disabled={!isFormValid()}
          >
            Sign In
          </Button>
        </form>
      </Box>
      <Box className="d-flex col-md-6">
        <img src="/assets/Picture1.png" alt="img" className="w-100" />
      </Box>
    </Container>
  );
}
