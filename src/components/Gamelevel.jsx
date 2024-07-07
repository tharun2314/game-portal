import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import {Navigate, useNavigate} from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Modal,ModalDialog} from '@mui/joy';
import {ModalClose} from '@mui/joy';
import Axios from '../Axios';
import { connect } from 'react-redux';
import { addItem,addLevel} from "./actions/itemActions"
import { useSelector, useDispatch } from 'react-redux';

 export default function Gamelevel({open,handleCloseModal,path,...props})
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let level;
      const handleLevel=(event)=>{
        Axios.get('/api/get-questions?difficulty='+event.target.id).then(({ data }) => {
            console.log(data)
            console.log(path,"heree")
            dispatch(addItem(data));
            if(event.target?.id=='easy')
              {
               level=1;
              }
              else if(event.target?.id=='medium')
                {
                  level=2
                }
                else
                {
                  level=3
                }
            dispatch(addLevel(level))
          
            setTimeout(()=>{navigate(path)},2000)
     
         }).catch(({ response }) => {
         })

      }

return (
    <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <ModalDialog layout="center">
          <Typography id="modal-modal-title"component="h1">Select Game level</Typography>
          <ModalClose onClick={handleCloseModal}/>
    <Button
    id="easy"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLevel}
            >
            Easy
            </Button>
            <Button
            id="medium"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLevel}
            >
         Medium
            </Button>
            <Button
            id="hard"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLevel}
            >
            Hard
            </Button>

  </ModalDialog>
      </Modal>
)
}
