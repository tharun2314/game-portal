import React, { useState } from 'react';
import Header from '../components/NotFound/Header';
import BasicCard from '../components/NotFound/BasicCard';
import Sidebar from '../components/NotFound/SideBar';
import Grid from '@mui/material/Grid';
import snake from "../components/images/snake-image.png";
import shooter from "../components/images/shooter.png";
import { useNavigate } from "react-router-dom";
import Gamelevel from '../components/Gamelevel';
import { Box } from '@mui/material';

export default function HomePage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState("");

  const clickPlay = (event) => {
    console.log("I am heree....", event.target);
    setPath(event.target.id);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ overflowX: 'hidden', padding: 0, margin: 0 }}>
      <Header />
      <Sidebar />
      <Grid container spacing={2} sx={{ marginLeft:30, padding: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <BasicCard name="Snake game" id="/snake-game" onClick={clickPlay} component={snake} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <BasicCard name="Shooter Game" id="/shooter-game" onClick={clickPlay} component={shooter} />
        </Grid>
        {open && <Gamelevel open={open} path={path} handleCloseModal={handleCloseModal} />}
      </Grid>
    </Box>
  );
}
