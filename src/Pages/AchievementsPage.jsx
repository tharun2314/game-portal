import React, { useEffect,useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Header from '../components/NotFound/Header';
import { CardMedia, Icon } from '@mui/material';
import cup from "../images/cup.png"
import GradeIcon from '@mui/icons-material/Grade'; // Material UI grade (gold cup) icon
import Axios from '../Axios';
import {  Box } from '@mui/material';

const GameCard = ({ score, title }) => {
  const isHighScore = score > 100;



  return (
    <Card sx={{ maxWidth: 345, opacity: isHighScore ? 1 : 0.3 }}>
        {!isHighScore && <Box 
        sx={{ 
          backgroundColor: 'red', 
          color: 'white', 
          padding: '4px 8px', 
          borderRadius: '4px',
          zIndex: 1,
          textAlign:'center'
        }}
      >
        Locked
      </Box>}
      <CardContent style={{ display: 'flex', alignItems: 'center',flexDirection:'row' ,gap:5}}>
        <CardMedia
        component="img"
        height="140"
        image={cup} // No specific image needed if using only the icon
        alt="Cup"/>
        <Icon
          sx={{ fontSize: '48px', marginRight: '10px', color: '#FFD700' }} // Gold color
        >
          <GradeIcon />
        </Icon>
        <div>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2">
            {`score: ${score}`}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default function AchievementPage() {

    const [scores,setScores]=useState([])


    useEffect(()=>{
        Axios.get('/api/get-achievement-data').then(({ data }) => {
            console.log(data)
            setScores(data)
         }).catch(({ response }) => {
         })
    },[])
  return (
    <>
      <Header />
      <h1 style={{textAlign:'center'}}>Achievements Page</h1>
      <div style={{ padding: '20px',display:'flex',gap:10 }}>
      
        <GameCard title="Snake Game" score={scores[0]?.highestScore} />
        <GameCard title="Space shooter" score={scores[1]?.highestScore} />
        <GameCard title="Mario Game" score={scores[2]?.highestScore} />
        <GameCard title="Car Game" score={scores[3]?.highestScore} />
      </div>
    </>
  );
}
