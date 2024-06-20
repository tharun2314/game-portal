import "./Header.css"
export default function Sidebar()
{
    return(
        <ul className="sidebar">
        <li className="item"><a class="active" href="#home">Home</a></li>
        <li className="item"><a href="#news">Scoreboard</a></li>
        <li className="item"><a href="#contact">Visualization</a></li>
        <li className="item"><a href="#about">About</a></li>
    </ul>
    )
}