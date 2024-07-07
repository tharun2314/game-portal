import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

export default function BasicCard(props) {
  return (
  
       <Card sx={{ minWidth: 275 }} id={props.id}>
      <CardContent>
        <Typography variant="h5" sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
          {props.name}
        </Typography>
        <CardMedia
          component="img"
          height="200"
          image={props.component}
          alt={props.name}
        />
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
