import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { Rating } from '@mui/material';
import Header from '../components/NotFound/Header';
import Axios from '../Axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from '../components/NotFound/SideBar';


const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [suggestion, setSuggestion] = useState('');
  const [feedbackData, setFeedbackData] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to the server
    console.log('Rating:', rating);
    console.log('Suggestion:', suggestion);
    Axios.post("api/add-feedback",{rating,feedback:suggestion})
    .then((res) => {
      setRating(0);
      setSuggestion('');     
      toast.success("Feedback submitted successfully")
    })
    .catch(() => {
      console.error("Failed to load graph results");
      toast.error("something went wrong")
    });
  };

  useEffect(()=>{
    Axios.get("api/get-feedbacks?top=10")
    .then((res) => {
      console.log(res);
      setFeedbackData(res.data.feedbacks)
     
    })
    .catch(() => {
      console.error("Failed to load graph results");
    });
  },[])

  return (
    <><Header />
    {/* <Sidebar/> */}
    <div>
    <Container maxWidth="sm">
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
              <Typography variant="h4" gutterBottom>
                  Feedback Form
              </Typography>
              <Typography component="legend">Rate our service</Typography>
              <Rating
                  name="service-rating"
                  value={rating}
                  onChange={(event, newValue) => {
                      setRating(newValue);
                  } } />
              <TextField
                  label="Suggestions"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={suggestion}
                  onChange={(event) => setSuggestion(event.target.value)} />
              <Button type="submit" variant="contained" color="primary">
                  Submit
              </Button>
          </Box>
      </Container>
      <h3 style={{textAlign:'center'}}>List of Feedback Reviews</h3>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Rating</TableCell>
            <TableCell>Feedback</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {feedbackData.map((feedback) => (
            <TableRow key={feedback.id}>
              <TableCell>{feedback.rating}</TableCell>
              <TableCell>{feedback.feedback}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Toaster/>
    </div>
      </>
  );
};

export default Feedback;
