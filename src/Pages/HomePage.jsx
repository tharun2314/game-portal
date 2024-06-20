import React, { useState } from 'react'
import Header from '../components/NotFound/Header'
import BasicCard from '../components/NotFound/BasicCard'
import Snakegame from '../components/NotFound/Snakegame'
import snake from "../images/snake.jpg"
import Sidebar from '../components/NotFound/SideBar'


export default function HomePage()
{
    const [showSnakeGame,setShowGame]=useState(false)
    const clickPlay=()=>{
        setShowGame(true)
    }
    return(
        <> <Header/>
        <Sidebar/>
        <div style={{display:'flex',justifyContent:"center",alignItems:"center"}}>
            
            {!showSnakeGame? <BasicCard name={"Snake game"}  component={snake} onClick={clickPlay}/> :<Snakegame/>}
        </div>
       </>

    )
}