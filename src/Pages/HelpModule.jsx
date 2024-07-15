import Axios from  '../Axios.js';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import YoutubeEmbed from "./components/YoutubeEmbed.jsx";
import Header from '../components/NotFound/Header.jsx';
import { useEffect, useState } from "react";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function HelpModule() {

    const [Link, setLink] = useState([]);
    const getLinks = () => {
        Axios.get('/api/get-help-module-links') // Bug 1: Corrected the API endpoint
            .then(({ data }) => {
                console.log(data);
                setLink(data.links);
            })
            .catch((error) => {
                // toast.error(error.message, {
                //     position: toast.POSITION.BOTTOM_RIGHT,
                //     draggable: true
                // });
            });

    }

    useEffect(() => {
        getLinks();
    }, []); // Bug 2: Added the dependency array

    return (
        <><Header /><div>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <h1>Learning Videos</h1>
                <div>
                    {Link && Link?.length > 0 ? Link.map((data, index) => {
                        return (
                            <div key={index}>
                                {/* Provide alternative text for the embedded YouTube videos */}
                                <span style={{ color: '#333333', fontSize: 18, fontFamily: 'Arial', fontWeight: '400', wordWrap: 'break-word', padding: 20 }}>Video {index + 1}</span>
                                <YoutubeEmbed embedId={data} />
                            </div>
                        );
                    }) : <div>No videos Found</div>}
                </div>
            </div>
        </div></>
      
    );
}