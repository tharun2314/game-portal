import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import "./Header.css"
import Logo from "../../images/Logo.png"
import ManageProfile from '../ManageProfile';

export default function Header() {

//     const [open,setOpen]=React.useState(false)
//     const [nav,setNav]=React.useState(false);

//     const handleProfileClick=()=>{
//   setOpen((prev)=>!prev)
//     }
//     const openNav=()=>{
//         setNav(!nav)
//     }
const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
const [openModal,setOpenModal]=React.useState(false);
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
setOpenModal(true);
  setAnchorEl(null);
};

const handleCloseModal=()=>{
    setOpenModal(false);
}
    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        // onClick={openNav}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography component="div" sx={{ flexGrow: 1 }} style={{ position: "relative",
    top: 12,
    right: 30
}}>
                    <img style={{width:70,marginTop:5}}src={Logo}></img>
                    </Typography>
                   
                    <div>
                        <AccountCircleOutlinedIcon id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined} fontSize='large'   onClick={handleClick} />
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            sx={{width:1/2}}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
        {openModal && <ManageProfile open={openModal} handleCloseModal={handleCloseModal}/>}
        </>
    );
}