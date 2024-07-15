import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { Rating } from '@mui/material';
import Header from '../components/NotFound/Header';
import Axios from '../Axios';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [suggestion, setSuggestion] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to the server
    console.log('Rating:', rating);
    console.log('Suggestion:', suggestion);
    Axios.post("api/add-feedback",{rating,feedback:suggestion})
    .then((res) => {
     
    })
    .catch(() => {
      console.error("Failed to load graph results");
    });
  };

  return (
    <><Header /><Container maxWidth="sm">
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
      </Container></>
  );
};

export default Feedback;
