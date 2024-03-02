import * as React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { post } from "../../utils/httpClient";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import SvgIcon from "@mui/material/SvgIcon";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function InputAdornments() {
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
  />;

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
  const [open, setOpen] = React.useState(false);
  const [newUserData, setNewUserData] = useState({
    username: "",
    pasword: "",
  });

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    try {
      const { name, value } = event.target;
      setNewUserData({ ...newUserData, [name]: value });
    } catch (error) {
      console.error("Error adding new user:", error);
    }
  };

  useEffect(() => {
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));
    if (userAuth && userAuth.id) {
      navigate("/");
    }
  }, []);

  const handleSend = async () => {
    try {
      const response = await post("/users", { username, pasword });
      if (response.error) {
        console.log("Wrong pass");
      } 
      else {
        localStorage.setItem("userAuth", JSON.stringify(response.user));
        navigate("/");
      }
    } catch (error) {
      console.error("Error user login:", error);
    }
  };

  const handleSignUp = async () => {
    try {
      const { username, pasword } = newUserData;
      const response = await post("/users", { username, pasword });
      console.log(username);
      console.log(pasword);
      console.log(response);
      handleClose();
      if (response.error) {
        console.log("Sign Up failed");
      }
    } catch (error) {
      console.error("Sign up failed:", error);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "0 20px",
        flexDirection: "column",
        background: `url("https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") no-repeat center center fixed`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div sx={{ marginBottom: "10px", padding: "100px" }}>
        <h1 sx={{ textAlign: "center", backgroundColor: "red" }}>
          Partial Introduction of Specific Tourism Destinations
        </h1>
      </div>
      <div style={{ maxWidth: "400px", width: "100%" }}>
        <h2 style={{ textAlign: "center" }}>LOGIN</h2>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            padding: "10px",
            margin: "10px",
          }}
        >
          <div>
            <TextField
              helperText=" "
              id="demo-helper-text-aligned-no-helper"
              label="Username"
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: "72%" }}
            />
            {/* <br /> */}
            <FormControl sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
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
            <Button
              variant="contained"
              sx={{ margin: "10px" }}
              disableElevation
              onClick={handleSend}
            >
              LOGIN
            </Button>
            <div style={{ color: "blue" }} onClick={handleClickOpen}>
              Don`t have an account? Sign up
            </div>
            <Dialog
              open={open}
              onClose={handleClose}
              PaperProps={{
                component: "form",
                onSubmit: (event) => {
                  event.preventDefault();
                  // handleClose();
                  // handleSignUp();
                },
              }}
            >
              <DialogTitle sx={{ textAlign: "center", fontFamily: "bold" }}>
                SIGN UP
              </DialogTitle>
              <br />
              <DialogContent>
                <TextField
                  label="Username"
                  name="username"
                  value={newUserData.username}
                  onChange={handleInputChange}
                />
                <br />
                <br />
                <TextField
                  label="Password"
                  name="pasword"
                  type="pasword"
                  value={newUserData.pasword}
                  onChange={handleInputChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" onClick={handleSignUp}>
                  Sign Up
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <Tooltip title="Back to Home Page">
            <Link
              to="/"
              style={{
                textAlign: "center",
                display: "block",
                marginTop: "20px",
              }}
            >
              {" "}
              <HomeIcon color="primary" />
            </Link>
          </Tooltip>
        </Box>
      </div>
    </div>
  );
}
