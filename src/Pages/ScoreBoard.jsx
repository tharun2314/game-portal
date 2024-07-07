import { useEffect, useState } from 'react';
import './Scoreboard.css'
import Axios from '../Axios.js';
import Switch from "react-switch";
import Header from '../components/NotFound/Header.jsx';
import Sidebar from '../components/NotFound/SideBar.jsx';
import * as React from 'react';
import MultipleSelect from '../components/Dropdown.jsx';
import { Toast,ToastContainer } from 'react-toastify';
import { Dropdown } from '@mui/joy';



export default function ScoreBoard() {
    const [state, setState] = useState('quiz');
    const [data, setData] = useState([{
        email:"Tharun",
        score:0
    }])
    const [game,setGames]=useState([])

    const handleChange = () => {
        if (state == 'quiz')
            setState('All')
        else
            setState('Individual')
    }

    const getData = () => {
        Axios.get('/api/leaderboard?type=' + state).then(({ data }) => {
            console.log("data", data.results)
            setData(data?.results)
        }).catch(({ response }) => {
            console.log(response.data.message)
        })

    }
    const handleDropdownChange = (event) => {
        const {
          target: { value },
        } = event;
        console.log(value)
        setGames(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };
    

    useEffect(() => {
        getData()
    }, [state])
    return (
        <><Header />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection:'column' }}>
                <h3>ScoreBoard</h3><br></br>
                <div style={{display:'flex',alignItems:'center',gap:2,width:'100%',justifyContent:'space-around'}}>
                <div style={{display:'flex',alignItems:'center',gap:2}}>
                    <h4> All</h4>
                <Switch
                    id="quizSwitch"
                    onChange={handleChange}
                    checkedIcon={<div></div>}
                    // width={56}
                    // height={28}
                    uncheckedIcon={<div></div>}
                    checked={state === 'quiz' ? false : true} />
                       <h4> Individual</h4>
                    </div>
          
                <MultipleSelect items={['Snake','Space Shooter','Mario Jump','Car Game']} DropdownValue={game} DropdownName={`Game`} handleDropdownChange={handleDropdownChange}/></div>
            </div><div id="container">
                {data.length > 0 ? data.map((el, index) => {
                    return (
                        <div key={index} className="row">
                            <div className="name">{el?.email}</div>
                            <div className="score">{el?.score}</div>
                        </div>
                    );
                }) : <h2>No Results Found</h2>}
            </div><ToastContainer /></>

    )

}