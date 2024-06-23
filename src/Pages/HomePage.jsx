import React, { useState } from 'react'
import Header from '../components/NotFound/Header'
import BasicCard from '../components/NotFound/BasicCard'
import Snakegame from '../components/NotFound/Snakegame'
import Sidebar from '../components/NotFound/SideBar'
import Grid from '@mui/material/Grid';
import snake from "../components/images/snake-image.png"
import shooter from "../components/images/shooter.png"
import { useNavigate } from "react-router-dom"


export default function HomePage()
{
    const navigate = useNavigate()
    const [showSnakeGame,setShowGame]=useState(false)
    const clickPlay=(path)=>{
       navigate(path)
    }
    return(
        <div>
             <Header/>
        <Sidebar/>
        <Grid container style={{marginLeft:300,marginTop:20}}spacing={2}>
            <Grid item>
            <BasicCard name={"Snake game"}   onClick={()=>clickPlay("/snake-game")} component={snake} />
            </Grid>
            <Grid item>
            <BasicCard name={"Shooter Game"}  onClick={clickPlay("/shooter-game")} component={shooter} />
            </Grid>
            

        </Grid>
       </div>

    )
}