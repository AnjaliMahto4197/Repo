import React, { useState } from "react";
import { Box, TextField, InputLabel, Button, Typography } from "@mui/material";

const Login = () => {
  const [userdata, setUserdata] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setUserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userdata),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Login successful!");
      } else {
        setMessage("Invalid credentials");
      }
    } catch (error) {
      setMessage("Server error");
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: { xs: "90%", sm: "70%", md: "40%", lg: "30%" },
        maxWidth: "400px",
        boxShadow: 3,
        padding: { xs: "20px", sm: "30px" },
        margin: "5% auto",
      }}
      onSubmit={submit}
    >
      <InputLabel htmlFor="username" sx={{ alignSelf: "flex-start", mb: 0.5 }}>
        Name:
      </InputLabel>
      <TextField
        id="username"
        name="username"
        type="text"
        variant="outlined"
        fullWidth
        onChange={handleChange}
      />

      <InputLabel htmlFor="password" sx={{ alignSelf: "flex-start", mt: 2, mb: 0.5 }}>
        Password:
      </InputLabel>
      <TextField
        id="password"
        name="password"
        type="password"
        variant="outlined"
        fullWidth
        onChange={handleChange}
      />

      {message && <Typography color="error" sx={{ mt: 2 }}>{message}</Typography>}

      <Button
        type="submit"
        variant="contained"
        sx={{
          marginTop: "1.5rem",
          backgroundColor: "primary.main",
          color: "white",
          width: "100%",
          "&:hover": { backgroundColor: "primary.dark" },
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
