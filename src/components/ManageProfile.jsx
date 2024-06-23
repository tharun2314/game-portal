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
import {useNavigate} from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Modal,ModalDialog} from '@mui/joy';
import {ModalClose} from '@mui/joy';
import Axios from '../Axios';




export default function ManageProfile({open,handleCloseModal})
{
    const [email,setEmail]=useState('');
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [dob,setdob]=useState('');
    useEffect(()=>{
        Axios.get('/api/get-profile-details').then(({ data }) => {
         setEmail(data.email)
         setFirstName(data.firstName);
         setLastName(data.lastName)
         setdob(data.dob);
  
      }).catch(({ response }) => {
      })  },[])

      const handleSubmit=()=>{
        Axios.put('/api/update-profile-details',{email,firstName,lastName,dob}).then(({ data }) => {
        handleCloseModal()
     
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
          <Typography id="modal-modal-title"component="h1">Manage Profile</Typography>
    <ModalClose onClick={handleCloseModal} />
    <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  autoFocus 
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                 />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name" 
                 value={lastName}
                onChange={(event) => {
                    setLastName(event.target.value);
                  }}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"  
                value={email} disabled />
              
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                  required
                  fullWidth
                  id="class-id"
                  label="Class ID"
                  name="class-id"
                  value={dob}
                   />
             
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >Submit</Button>

  </ModalDialog>
        {/* <Card>
            <CardContent>
            <Box component="form" noValidate  sx={{ mt: 3 }}>
            
             Update
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Close
            </Button>
          </Box></CardContent>
                  </Card> */}
      </Modal>
)
}
