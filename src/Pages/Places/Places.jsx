import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GET } from '../../utils/httpClient';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';
import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Tooltip from '@mui/material/Tooltip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import CardMedia from '@mui/material/CardMedia';
import { Place } from '@mui/icons-material';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';


export default function PlaceDetailPage() {
  const { id } = useParams();
  const [place, setPlace] = useState('');
  const [isadmin, setIsAdmin] = useState(false);

  const [value, setValue] = React.useState(2);

  const fetchPlace = async () => {
    try {
      const res = await GET(`/places/${id}`);
      setPlace(res);
      console.log(res);
    } catch (error) {
      console.error('Error fetching place:', error);
    }
  };

  useEffect(() => {
    fetchPlace();
    const userAuth = JSON.parse(localStorage.getItem('userAuth'));
    setIsAdmin(userAuth?.isadmin || false);
  }, [id]);

  const labels = {
    1: 'Not Pleasant',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }

  const [hover, setHover] = React.useState(-1);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const [openDialog, setOpenDialog] = React.useState(false);
  const [hardship, setHardship] = React.useState('');

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


  const handleHardshipChange = (event) => {
    setHardship(event.target.value);
  };

  const handleEdit = async () => {
    try {
      if (!id) {
          console.error("Selected Place ID is undefined");
          return;
      }

      const response = await fetch(`http://localhost:3000/places/${id}`, {
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
        // handleClose();
        fetchPlace();
      } else {
        throw new Error('Failed to update place');
      }
    } catch (error) {
      console.error("Error editing place:", error);
    }
  };

  const navigate = useNavigate();


  const handleDelete = async () => {
    try {
      if (!id) {
          console.error("Selected Place ID is undefined");
          return;
      }

      const response = await fetch(`http://localhost:3000/places/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        navigate("/");
      } else {
        throw new Error('Failed to delete place');
      }
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  };

  if (!place) {
    return <div>Wait a Moment !!!</div>;
  }

  return (
    <div>

      <Card>
        <CardContent sx={{ backgroundColor: 'azure', position: 'relative' }}>
          <CardMedia component="img" height="180" image={Place[0]?.place_image} alt="img" />
          <Typography variant="h5" component="h2">
            {place[0]?.name}
          </Typography>
          <Typography varient="h5" component="h3">
            Country: {place[0]?.country}
          </Typography>
          <Typography variant="body2" component="p">
            Hardship: {place[0]?.hardship}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Description: {place[0]?.description}
          </Typography>
          <br />
          <Link to="/"><Tooltip title="Back"><Button variant="outlined" ><ArrowBackIcon /></Button></Tooltip></Link>
          {isadmin && <Tooltip title="Edit"><Button variant="outlined" onClick={handleOpenDialog}><EditIcon></EditIcon></Button></Tooltip>}
          {isadmin && <Tooltip title="Delete"><Button variant="outlined" onClick={handleDelete}><DeleteIcon /></Button></Tooltip>}
          <Box sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            margin: '8px',
            display: 'flex',
            alignItems: 'center',
          }}>
            <span>Rate:</span>
            <Rating
              name="hover-feedback"
              value={value}
              // precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {value !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </Box>

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
        </CardContent>
      </Card>

    </div>

  );
};


