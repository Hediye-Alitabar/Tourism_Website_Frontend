import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GET } from '../../utils/httpClient';
import { post } from '../../utils/httpClient'
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
import CommentIcon from '@mui/icons-material/Comment';



export default function PlaceDetailPage() {
  
  const MAX_LENGTH = 350;

  const { id } = useParams();
  const [place, setPlace] = useState('');
  const [isadmin, setIsAdmin] = useState(false);
  const [comments, setComments] = useState([]);
  const [value, setValue] = React.useState(2);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [hardship, setHardship] = React.useState('');
  const [openCRDialog, setOpenCRDialog] = React.useState(false);
  const [hover, setHover] = React.useState(-1);
  const [commentText, setCommentText] = React.useState('');
  const [averageRating, setAverageRating] = useState(0);
  const [userAuth, setUserAuth] = useState(null);


  const fetchPlace = async () => {
    try {
      const res = await GET(`/places/${id}`);
      setPlace(res);
      console.log(res);
    } catch (error) {
      console.error('Error fetching place:', error);
    }
  };


  const fetchComments = async () => {
    try {
      const res = await GET(`/reviews/${id}`);
      setComments(res);
      console.log(res);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchUserAuth = () => {
    const userAuthData = localStorage.getItem('userAuth');
    setUserAuth(userAuthData ? JSON.parse(userAuthData) : null);
  };

  useEffect(() => {
    fetchPlace();
    fetchComments();
    fetchUserAuth();
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

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleOpenCRDialog = () => {
    setOpenCRDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


  const handleCloseCRDialog = () => {
    setOpenCRDialog(false);
  };


  const handleHardshipChange = (event) => {
    setHardship(event.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      if (!userAuth || !userAuth.id) {
        console.error('User is not logged in');
        return;
      }
      const response = await post('/reviews', {
        user_id: userAuth.id,
        place_id: id,
        rating: value,
        review_comment: commentText
      });
      if (response.error) {
        console.error('Error adding comment:', response.error);
      } else {
        console.log('Comment added successfully');
        fetchComments();
      }
      handleCloseCRDialog();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
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
          }}>

            <Tooltip title="Add Comment or Rate"><Button onClick={handleOpenCRDialog}><CommentIcon /></Button></Tooltip>
            <Dialog
              open={openCRDialog}
              onClose={handleCloseCRDialog}
              PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const formJson = Object.fromEntries(formData.entries());
                  const email = formJson.email;
                  console.log(email);
                  handleCloseCRDialog();
                },
              }}>
              <DialogTitle>Commet & Rate</DialogTitle>
              <DialogContent>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '60ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField id="outlined-basic" label="Comment" variant="outlined" value={commentText}
                    onChange={(event) => setCommentText(event.target.value)}
                    inputProps={{ maxLength: MAX_LENGTH }}
                    multiline
                    rows={4} />
                  <Typography variant="body2" color="textSecondary">{MAX_LENGTH - commentText.length}
                    Characters Remaining
                  </Typography>

                </Box>

                <Box sx={{
                  position: 'absolute',
                  // bottom: 0,
                  // right: 0,
                  margin: '8px',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <span>Rate:</span>
                  <Rating
                    name="hover-feedback"
                    value={value}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                  />
                  {/* {value !== null && (
              <Box sx={{ ml: 2, backgroundColor:"pink" }}>{labels[hover !== -1 ? hover : value]}</Box>
            )} */}
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseCRDialog}>Cancel</Button>
                <Button onClick={handleCommentSubmit}>Submit</Button>
              </DialogActions>
            </Dialog>
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
      {comments.length > 0 && (<Typography variant="h6" component="h4">Comments:</Typography>)}
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            <Typography>User ID: {comment.user_id}</Typography>
            <Typography>Comment: {comment.review_comment}</Typography>
            <Rating name={`rating-${index}`} value={parseInt(comment.rating)} readOnly />
          </li>
        ))}
      </ul>
    </div>

  );
};


