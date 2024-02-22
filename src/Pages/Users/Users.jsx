import * as React from 'react';
import './Login.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { post } from '../../utils/httpClient'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function InputAdornments() {

  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
  />


  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = useState("");
  const [pasword, setPasword] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    const userAuth = JSON.parse(localStorage.getItem('userAuth'));
    if (userAuth && userAuth.id) {
      navigate("/");
    }
    // console.log(userAuth);
  }, []);


  const handleSend = async () => {
    const response = await post("/users", { username, pasword }); 
    if (response.error) {
      console.log('Wrong pass');
    } else {
      localStorage.setItem('userAuth', JSON.stringify(response.user));
      navigate("/");
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className='login'>
      <h2>LOGIN</h2>
      <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', width: '30ch' }}>
        <div>
          <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="Name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <FormControl sx={{ m: 1 }} variant="outlined" >
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setPasword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />

          </FormControl>
          <br /><br />
          <Button variant="contained" disableElevation onClick={handleSend}>
            LOGIN
          </Button>
        </div>
        <Link to='/'>Back</Link>
      </Box>
    </div>
  );
}
