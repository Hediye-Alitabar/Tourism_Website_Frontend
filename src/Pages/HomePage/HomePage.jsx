import { Link } from "react-router-dom";
import { GET } from '../../utils/httpClient';
import { post } from '../../utils/httpClient';
import { patch } from '../../utils/httpClient';
import { DELETE } from '../../utils/httpClient';
import './HomePage.css';

import { useEffect, useState } from "react";

import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Modal from '@mui/material/Modal';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function HomePage() {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    const [openDialog, setOpenDialog] = React.useState(false);
    const [openAddDialog, setOpenAddDialog] = React.useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [isadmin, setIsAdmin] = useState(false);

    const [selectedPlaceDescription, setSelectedPlaceDescription] = React.useState('');
    const [selectedPlaceHardship, setSelectedPlaceHardship] = React.useState('');
    const [selectedPlaceId, setSelectedPlaceId] = React.useState([]);


    const [places, setPlaces] = useState([]);

    const [hardship, setHardship] = React.useState('');


    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleOpenaddDialog = () => {
        setOpenAddDialog(true);
    };

    const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
    };

    const handleHardshipChange = (event) => {
        setHardship(event.target.value);
    };

    const handleEdit = async () => {
        try {
            if (!selectedPlaceId) {
                console.error("Selected Place ID is undefined");
                return;
            }

            const response = await fetch(`http://localhost:3000/places/${selectedPlaceId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    hardship: hardship
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                handleCloseDialog();
                handleClose();
                loadPlaces();
            } else {
                throw new Error('Failed to update place');
            }
        } catch (error) {
            console.error("Error editing place:", error);
        }
    };

    const handleOpen = (placeId, description, hardship) => {
        setSelectedPlaceId(placeId);
        setSelectedPlaceDescription(description);
        setSelectedPlaceHardship(hardship);
        setOpen(true);
    };


    const loadPlaces = async () => {
        // const data = await fetch("http://localhost:3000/places").then((response) =>
        //     response.json()
        // );
        const data = await GET('/places');
        setPlaces(data);
        setFilteredPlaces(data);
    };

    useEffect(() => {
        loadPlaces();
        const userAuth = JSON.parse(localStorage.getItem('userAuth'));
        setIsAdmin(userAuth?.isadmin || false); 
    }, []);

    const logout = () => {
        localStorage.setItem("userAuth", null);
    }

    const handleSearch = () => {
        if (searchQuery === '') {
            setFilteredPlaces(places);
        } else {
            const filtered = places.filter(place => {
                return place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    place.country.toLowerCase().includes(searchQuery.toLowerCase());
            });
            setFilteredPlaces(filtered);
        }
    };

    const [newPlaceData, setNewPlaceData] = useState({
        name: '',
        description: '',
        country: '',
        hardship: '',
        image: ''
    });

    const handleAddPlace = async () => {
        try {
            await post('/places', newPlaceData);
            loadPlaces();
            setNewPlaceData({
                name: '',
                description: '',
                country: '',
                hardship: '',
                image: ''
            });
            handleCloseAddDialog();
        } catch (error) {
            console.error('Error adding place:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewPlaceData({ ...newPlaceData, [name]: value });
    };

    const handleDelete = async () => {
        try {
            if (!selectedPlaceId) {
                console.error("Selected Place ID is undefined");
                return;
            }

            const response = await fetch(`http://localhost:3000/places/${selectedPlaceId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                handleClose();
                loadPlaces();
            } else {
                throw new Error('Failed to delete place');
            }
        } catch (error) {
            console.error("Error deleting place:", error);
        }
    };

    const handleSortByhardship = () => {
        let sortedPlaces = [...places];
        sortedPlaces.sort((a, b) => a.hardship - b.hardship);
        setFilteredPlaces(sortedPlaces);
    };

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" >
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div><Link to='/users'>
                            <IconButton size="large" edge="end" aria-label="account of current user" aria-haspopup="true" color="inherit">
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
                            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search', style: { width: '500px' } }} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </Search>
                        <Tooltip title="decreasing hardship"><IconButton onClick={handleSortByhardship}><ArrowDownwardIcon /></IconButton></Tooltip>

                        <Button onClick={logout} variant="contained">Log out</Button>

                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '80px', textAlign:'center'}}>
                <Card sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>

                    {filteredPlaces?.map((t) => (
                        <CardActionArea key={t.id} sx={{ display: 'flex', flexDirection: 'column', width: '20%', height: '20%', margin: '10px', padding: '10px'}} >
                            <CardMedia component="img" height="180" image={t.place_image} alt="img" />
                            <CardContent>
                                <Typography variant="h6" color="text.secondary">
                                    {t.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {t.country}
                                </Typography>
                                <div style={{color:'blue'}} onClick={() => handleOpen(t.id, t.description, t.hardship)}>More Detail</div>

                                <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    open={open}
                                    onClose={handleClose}
                                    closeAfterTransition
                                    slots={{ backdrop: Backdrop }}
                                    slotProps={{
                                        backdrop: { timeout: 500, },
                                    }}>
                                    <Fade in={open}>
                                        <Box sx={style}>
                                            <Typography id="transition-modal-title" variant="body1" component="p">
                                                {selectedPlaceId}
                                                Description: {selectedPlaceDescription}
                                                <br />
                                                Hardship Level: {selectedPlaceHardship} 

                                            </Typography>

                                            <Tooltip title="Back"><Button variant="outlined" onClick={handleClose}><ArrowBackIcon /></Button></Tooltip>
                                            {isadmin && <Tooltip title="Edit"><Button variant="outlined" onClick={handleOpenDialog}><EditIcon></EditIcon></Button></Tooltip>}
                                            {isadmin && <Tooltip title="Delete"><Button variant="outlined" onClick={handleDelete}><DeleteIcon /></Button></Tooltip>}
                                            <Dialog
                                                open={openDialog}
                                                onClose={handleCloseDialog}
                                                PaperProps={{
                                                    component: 'form',
                                                    onSubmit: (event) => {
                                                        event.preventDefault();
                                                        const formData = new FormData(event.currentTarget);
                                                        const formJson = Object.fromEntries(formData.entries());
                                                        const email = formJson.email;
                                                        console.log(email);
                                                        handleCloseDialog();
                                                    },
                                                }}>
                                                <DialogTitle>Edit Data</DialogTitle>
                                                <DialogContent>
                                                    {/* <InputLabel size="normal" focused>Description:</InputLabel>
                                                <TextField

                                                /> */}

                                                    <InputLabel size="normal" focused>Hardship:</InputLabel>
                                                    <TextField
                                                        value={hardship}
                                                        onChange={handleHardshipChange}
                                                    />
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleCloseDialog}>Cancel</Button>
                                                    <Button onClick={handleEdit}>UPDATE</Button>

                                                </DialogActions>
                                            </Dialog>

                                        </Box>
                                    </Fade>

                                </Modal>
                            </CardContent>
                        </CardActionArea>
                    ))}
                </Card>
            </Box>
            {isadmin && (<Tooltip title="Add Place"><Button onClick={handleOpenaddDialog}><AddIcon /></Button>  </Tooltip>)}
            <Dialog
                open={openAddDialog}
                onClose={handleCloseAddDialog}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        handleCloseDialog();
                    },
                }}>
                <DialogTitle>Add Place</DialogTitle>
                <DialogContent>
                    <InputLabel size="normal" focused>Name:</InputLabel>
                    <TextField name="name"
                        value={newPlaceData.name}
                        onChange={handleInputChange} />
                    <InputLabel size="normal" focused>Description:</InputLabel>
                    <TextField name="description"
                        value={newPlaceData.description}
                        onChange={handleInputChange} />
                    <InputLabel size="normal" focused>Country:</InputLabel>
                    <TextField name="country"
                        value={newPlaceData.country}
                        onChange={handleInputChange} />
                    <InputLabel size="normal" focused>Hardship Level:</InputLabel>
                    <TextField name="hardship"
                        value={newPlaceData.hardship}
                        onChange={handleInputChange} />
                    <InputLabel size="normal" focused>Image URL:</InputLabel>
                    <TextField name="image"
                        value={newPlaceData.image}
                        onChange={handleInputChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddDialog}>Cancel</Button>
                    <Button onClick={handleAddPlace}>Add</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}