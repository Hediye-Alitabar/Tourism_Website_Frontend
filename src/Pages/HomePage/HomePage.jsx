import { Link } from "react-router-dom";
import { GET } from '../../utils/httpClient'
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


export default function PrimarySearchAppBar() {
    const [places, setPlaces] = useState([]);

    const loadPlaces = async () => {
        // const data = await fetch("http://localhost:3000/places").then((response) =>
        //     response.json()
        // );
        const data = await GET('/places');
        setPlaces(data);
    };

    useEffect(() => {
        loadPlaces();
    }, []);

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <div><Link to='/login'>
                            <IconButton sx={{ display: { width: '80px' } }} size="large" edge="end" aria-label="account of current user" aria-haspopup="true" color="inherit">
                                <AccountCircle />
                                <span>Login</span>
                            </IconButton>
                        </Link>
                        </div>
                        {/* <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                               Tourism 
                    </Typography> */}
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search', style: { width: '500px' } }} />
                        </Search>
                    </Toolbar>
                </AppBar>
            </Box>

            <Card sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>

                {places?.map((t) => (
                    <CardActionArea key={t.id} sx={{ display: 'flex', flexDirection: 'column', width: '20%', height: '20%', margin: '10px', padding: '10px' }} >
                        <CardMedia component="img" height="140" image="https://i.pinimg.com/736x/77/27/ec/7727ecc5b20887f5de0b08c54b7f2924.jpg" alt="lizard" />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {t.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {t.country}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                ))}
            </Card>
        </div>
    );
}