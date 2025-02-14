import React, { useState } from 'react';
import { Box, TextField, InputLabel, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState({
    username: "",
    password: "",
    email: ""
  });

  const handleChange = (e) => {
    setUserdata({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    try {
      console.log("User Data:", userdata);
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userdata),
      });

      if (response.ok) {
        alert("Signup successful!");
        navigate('/login'); 
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: { xs: '90%', sm: '60%', md: '40%', lg: '30%' },
        boxShadow: 3,
        padding: { xs: '20px', md: '30px' },
        margin: '5% auto',
        borderRadius: 2,
        bgcolor: 'background.paper',
      }}
    >
      <InputLabel htmlFor="username" sx={{ alignSelf: 'flex-start', mb: 0.5 }}>Name:</InputLabel>
      <TextField id="username" name="username" type="text" variant="outlined" margin="normal" fullWidth value={userdata.username} onChange={handleChange} />

      <InputLabel htmlFor="password" sx={{ alignSelf: 'flex-start', mb: 0.5 }}>Password:</InputLabel>
      <TextField id="password" name="password" type="password" variant="outlined" margin="normal" fullWidth value={userdata.password} onChange={handleChange} />

      <InputLabel htmlFor="email" sx={{ alignSelf: 'flex-start', mb: 0.5 }}>Email:</InputLabel>
      <TextField id="email" name="email" type="email" variant="outlined" margin="normal" fullWidth value={userdata.email} onChange={handleChange} />

      <Button
        onClick={handleClick}
        variant="contained"
        sx={{
          marginTop: '1.5rem',
          backgroundColor: 'primary.main',
          color: 'white',
          '&:hover': { backgroundColor: 'primary.dark' },
          width: '100%',
        }}
      >
        Sign up
      </Button>
    </Box>
  );
};

export default Signup;
