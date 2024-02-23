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
import SvgIcon from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';

export default function InputAdornments() {

  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
  />

  function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  minHeight: '100vh', padding: '0 20px' }}>
      <div style={{maxWidth: '400px', width: '100%'}}>
      <h2 style={{ textAlign: 'center' }} >LOGIN</h2>
      <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
        <div>
          <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="Name"
            onChange={(e) => setUsername(e.target.value)}
            
            style={{ marginBottom: '10px', width: '65%'}}
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
              // style={{ width: '100%' }}
            />

          </FormControl>
          <br /><br />
          <Button variant="contained" disableElevation onClick={handleSend}>
            LOGIN
          </Button>
        </div>
       <Tooltip title="Back to Home Page"><Link to='/' style={{ textAlign: 'center', display: 'block', marginTop: '20px' }}> <HomeIcon color="primary" /></Link></Tooltip> 
      </Box>
      </div>
    </div>
  );
}
