import React from "react";
import "./Menu.css";
import Button from '@mui/material/Button';

const Menu = ({ onRouteChange }) => {
  return (
        <Button
        variant="contained"
        style={{marginTop:100,width:80}}
          onClick={onRouteChange}
          type="button"
          value="start game">Start Game</Button>
  );
};

export default Menu;
