import React from "react";
import "./Menu.css";
import Button from '@mui/material/Button';

const Menu = ({ onRouteChange }) => {
  return (
    <div className="wrapper">
      <div>
        <Button
        variant="contained"
        style={{margin:100}}
          onClick={onRouteChange}
          type="button"
          value="start game">Start Game</Button>
      </div>
    </div>
  );
};

export default Menu;
