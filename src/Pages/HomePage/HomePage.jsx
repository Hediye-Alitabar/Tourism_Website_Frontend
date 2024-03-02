import { Link } from "react-router-dom";
import { GET } from "../../utils/httpClient";
import { post } from "../../utils/httpClient";
import { patch } from "../../utils/httpClient";
import { DELETE } from "../../utils/httpClient";

import { useEffect, useState } from "react";

import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function HomePage() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [isadmin, setIsAdmin] = useState(false);
  const [places, setPlaces] = useState([]);

  const [newPlaceData, setNewPlaceData] = useState({
    name: "",
    description: "",
    country: "",
    hardship: "",
    image: "",
  });

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenaddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const navigate = useNavigate();

  const handleOpen = (id) => {
    navigate(`/places/${id}`);
  };

  const loadPlaces = async () => {
    const data = await GET("/places");
    setPlaces(data);
    setFilteredPlaces(data);
  };

  const userAuth = JSON.parse(localStorage.getItem("userAuth"));
  useEffect(() => {
    loadPlaces();
    setIsAdmin(userAuth?.isadmin || false);
  }, []);

  const logout = () => {
    localStorage.setItem("userAuth", null);
  };

  const handleSearch = () => {
    try {
      if (searchQuery === "") {
        setFilteredPlaces(places);
      } else {
        const filtered = places.filter((place) => {
          return (
            place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            place.country.toLowerCase().includes(searchQuery.toLowerCase())
          );
        });
        setFilteredPlaces(filtered);
      }
    } catch (error) {
      console.error("Error finding place:", error);
    }
  };

  const handleAddPlace = async () => {
    try {
      await post("/places", newPlaceData);
      loadPlaces();
      setNewPlaceData({
        name: "",
        description: "",
        country: "",
        hardship: "",
        image: "",
      });
      handleCloseAddDialog();
    } catch (error) {
      console.error("Error adding place:", error);
    }
  };

  const handleInputChange = (event) => {
    try {
      const { name, value } = event.target;
      setNewPlaceData({ ...newPlaceData, [name]: value });
    } catch (error) {
      console.error("Error adding place:", error);
    }
  };

  const handleSortByhardship = () => {
    try {
      let sortedPlaces = [...places];
      sortedPlaces.sort((a, b) => a.hardship - b.hardship);
      setFilteredPlaces(sortedPlaces);
    } catch (error) {
      console.error("Error sorting place:", error);
    }
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Link to="/users">
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                  <span>Login</span>
                </IconButton>
              </Link>
            </div>
            <Search>
              <Button onClick={handleSearch}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
              </Button>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{
                  "aria-label": "search",
                  style: { width: "600px" },
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Search>
            <Tooltip title="decreasing hardship">
              <IconButton onClick={handleSortByhardship}>
                <ArrowDownwardIcon />
              </IconButton>
            </Tooltip>

            {userAuth && (
              <Button onClick={logout} variant="contained">
                Log out
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "80px",
          textAlign: "center",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "space-around",
          }}
        >
          {filteredPlaces?.map((t) => (
            <CardActionArea
              key={t.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "20%",
                height: "20%",
                margin: "10px",
                padding: "10px",
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={t.place_image}
                alt="img"
              />
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  {t.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t.country}
                </Typography>
                <div style={{ color: "blue" }} onClick={() => handleOpen(t.id)}>
                  More Detail
                </div>
              </CardContent>
            </CardActionArea>
          ))}
        </Card>
      </Box>
      {isadmin && (
        <Tooltip title="Add Place">
          <span>
          <Button onClick={handleOpenaddDialog}>
            <AddIcon />
          </Button>{" "}
          </span>
        </Tooltip>
      )}
      <Dialog
        open={openAddDialog}
        onClose={handleCloseAddDialog}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleCloseDialog();
          },
        }}
      >
        <DialogTitle>Add Place</DialogTitle>
        <DialogContent>
          <InputLabel size="normal" focused>
            Name:
          </InputLabel>
          <TextField
            name="name"
            value={newPlaceData.name}
            onChange={handleInputChange}
          />
          <InputLabel size="normal" focused>
            Description:
          </InputLabel>
          <TextField
            name="description"
            value={newPlaceData.description}
            onChange={handleInputChange}
          />
          <InputLabel size="normal" focused>
            Country:
          </InputLabel>
          <TextField
            name="country"
            value={newPlaceData.country}
            onChange={handleInputChange}
          />
          <InputLabel size="normal" focused>
            Hardship Level:
          </InputLabel>
          <TextField
            name="hardship"
            value={newPlaceData.hardship}
            onChange={handleInputChange}
          />
          <InputLabel size="normal" focused>
            Image URL:
          </InputLabel>
          <TextField
            name="image"
            value={newPlaceData.image}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleAddPlace}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
