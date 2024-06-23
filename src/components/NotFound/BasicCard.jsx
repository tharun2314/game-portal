import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import snake from "../../images/snake.jpg"



const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard(props) {
  return (
    <Card sx={{ minWidth: 275 }} id={props.id}>
      <CardContent>
        <Typography variant="headline" sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
         {props.name}
        </Typography>
        <Typography component="div">
        <img src={props.component} style={{width:300,height:200}}/>
        </Typography>
  
        <Typography component="p">
        {props.description}
        </Typography>
      </CardContent>
      <CardActions>
      <Button variant="contained" onClick={props.onClick} id={props.id}>Play</Button>
        </CardActions>
   
    </Card>
  );
}