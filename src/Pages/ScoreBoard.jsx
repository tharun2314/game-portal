import { useEffect, useState } from 'react';
import './Scoreboard.css';
import Axios from '../Axios.js';
import Switch from "react-switch";
import Header from '../components/NotFound/Header.jsx';
import Sidebar from '../components/NotFound/SideBar.jsx';
import * as React from 'react';
import MultipleSelect from '../components/Dropdown.jsx';
import { Toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dropdown } from '@mui/joy';
import ShareIcon from '@mui/icons-material/Share';
import Share from '@mui/icons-material/Share';
import { useLocation } from 'react-router-dom';
import {Tooltip as ReactTooltip} from 'react-tooltip';

const Games = {
    'Snake': 1,
    'Shooter': 2,
    'Mario-Jump': 3,
    'Car-Game': 4
}
const Level = {
    'Easy': 1,
    'Medium': 2,
    'Hard': 3,
}

export default function ScoreBoard() {
    const location = useLocation();
    const [state, setState] = useState('quiz');
    const [data, setData] = useState([{
        email: "Tharun",
        score: 0
    }])
    const [game, setGames] = useState('Snake');
    const [level, setLevel] = useState('Easy');

    const handleChange = () => {
        if (state === 'quiz')
            setState('All')
        else
            setState('Individual')
    }

    useEffect(() => {
        getData();

    }, [game, level]);

    const getData = () => {
        Axios.get(`/api/get-scores?top=10&game_id=${Games[game]}&level=${Level[level]}`).then(({ data }) => {
            console.log("data", data.scores);
            setData(data?.scores);
        }).catch(({ response }) => {
            console.log(response.data.message);
        });
    }

    const handleDropdownChange = (event) => {
        const { target: { value } } = event;
        console.log(value);
        setGames(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleDropdownLevelChange = (event) => {
        const { target: { value } } = event;
        console.log(value);
        setLevel(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        getData();
    }, [state]);

    const copyToClipboard = (text) => {
        console.log(window.location.host);
        let url = window.location.host + `/score-details/${text}`;
        navigator.clipboard.writeText(url)
            .then(() => {
                console.log('Text copied to clipboard:', text);
                ReactTooltip.show(document.getElementById(`share-${text}`));
                setTimeout(() => {
                    ReactTooltip.hide(document.getElementById(`share-${text}`));
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy text:', err);
            });
    };

    return (
        <>
            <Header />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <h2>Score Board</h2><br />
                <div style={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', justifyContent: 'space-around' }}>
                    {/* <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <h4> All</h4>
                        <Switch
                            id="quizSwitch"
                            onChange={handleChange}
                            checkedIcon={<div></div>}
                            uncheckedIcon={<div></div>}
                            checked={state === 'quiz' ? false : true} />
                        <h4> Individual</h4>
                    </div> */}
                    <MultipleSelect items={['Snake', 'Shooter', 'Mario-Jump', 'Car-Game']} DropdownValue={game} DropdownName={`Game`} handleDropdownChange={handleDropdownChange} />
                    <MultipleSelect items={['Easy', 'Medium', 'Hard']} DropdownValue={level} DropdownName={`Level`} handleDropdownChange={handleDropdownLevelChange} />
                </div>
            </div>
            <div id="container">
            <div  className="row">
                            <div className="name">{"Full Name"}</div>
                            <div className="email" style={{ color: 'black' }}>{"Email"}</div>
                            <div className="score" style={{ color: 'black' }}>{"Score"}</div>
                            </div>
                {data?.length > 0 ? data.map((el, index) => {
                    return (
                        <div key={index} className="row">
                            <div className="name">{el?.fullName}</div>
                            <div className="email" style={{ color: 'black' }}>{el?.played_by}</div>
                            <div className="score" style={{ color: 'black' }}>{el?.score}</div>
                            <Share data-tooltip-id="my-tooltip"
  data-tooltip-content="Copy Link"
  data-tooltip-place="top"id={`share-${el?.scoreId}`} data-tip="Copied!" data-for={`tooltip-${el?.scoreId}`} onClick={() => copyToClipboard(el?.scoreId)} />
                            <ReactTooltip id="my-tooltip" />
                        </div>
                    );
                }) : <h2>No Results Found</h2>}
            </div>
            <ToastContainer />
        </>
    );
}
