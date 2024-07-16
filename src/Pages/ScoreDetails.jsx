import React, { useEffect,useState } from 'react';
import Axios from '../Axios';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import snake from "../components/images/snake-image.png";
import shooter from "../components/images/shooter.png";
import mario from "../components/images/mario.png";
import { Box } from '@mui/material';
import car from "../components/images/car-game.png"
import {
    useParams
  } from "react-router-dom";
  import Header from '../components/NotFound/Header';

  const games={
    1:snake,
    2:shooter,
    3:mario,
    4:car
  }
const UserScoreDetails = () => {
    let { id } = useParams();


    const [scores,setScores]=useState([]);

    useEffect(()=>{
        Axios.get('/api/get-score-details/'+id).then(({ data }) => {
            console.log(data)
            setScores(data)
         }).catch(({ response }) => {
         })

    },[])
  return (
    <><Header /><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <h2>Shared Score Results !!!!!!!!</h2>
          <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                  avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {scores?.fullName?.[0]}
                  </Avatar>}
                  title={scores?.fullName}
                  subheader={`Played on ${new Date(scores?.created_on)?.toUTCString()}`} />
              <CardMedia
                  component="img"
                  height="194"
                  image={games[scores?.game_id]}
                  alt="Paella dish" />
              <CardContent>
                  <Typography variant="body2" color="text.secondary">
                      Score:{scores?.score}<br></br>
                      Level:{scores?.level}
                  </Typography>
              </CardContent>
          </Card></div></>
  );
};

export default UserScoreDetails;
