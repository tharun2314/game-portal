import React, { useState } from 'react';
import Header from '../components/NotFound/Header';
import BasicCard from '../components/NotFound/BasicCard';
import Sidebar from '../components/NotFound/SideBar';
import Grid from '@mui/material/Grid';
import snake from "../components/images/snake-image.png";
import shooter from "../components/images/shooter.png";
import { useNavigate } from "react-router-dom";
import Gamelevel from '../components/Gamelevel';
import mario from "../components/images/mario.png";
import { Box } from '@mui/material';
import car from "../components/images/car-game.png"


export default function HomePage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState("");

  const clickPlay = (event) => {
    console.log("I am heree....", event.target);
    event.preventDefault();
    event.stopPropagation();
    setPath(event.target.id);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setPath("")
  };

  return (
    <Box sx={{ overflowX: 'hidden', padding: 0, margin: 0 }}>
      <Header />
      <Sidebar />
      <Box sx={{ padding: 2, marginLeft: 30 }}>
        <Grid container spacing={2} sx={{ flexWrap: 'wrap' }}>
          <Grid item xs={4}>
            <BasicCard name="Snake Game" id="/snake-game" onClick={clickPlay} component={snake} />
          </Grid>
          <Grid item xs={3}>
            <BasicCard name="Shooter Game" id="/shooter-game" onClick={clickPlay} component={shooter} />
          </Grid>
          <Grid item xs={3} >
            <BasicCard name="Mario Jump" id="/mario-jump" onClick={clickPlay} component={mario} />
          </Grid>
          <Grid item xs={4} sm={6} md={3}>
            <BasicCard name="Car Game" id="/car-game" onClick={clickPlay} component={car} />
          </Grid>
          {open && <Gamelevel open={open} path={path} handleCloseModal={handleCloseModal} />}
        </Grid>
      </Box>
    </Box>
  );
}
