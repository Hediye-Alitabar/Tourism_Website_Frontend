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

export default function InputAdornments() {

  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
  />


  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = useState("");
  const [pasword, setPasword] = useState("");

  const handleSned = async () => {
    const response = await post("/login", { username, pasword });
    console.log(response);
  };


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className='login'>
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
              type={showPassword ? 'text' : 'password' }
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
          <Button variant="contained" disableElevation onClick={handleSned}>
            LOGIN
          </Button>
        </div>
        <Link to='/'>Back</Link>
      </Box>
    </div>
  );
}
