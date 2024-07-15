import "./Header.css"
export default function Sidebar()
{
    return(
        <aside className="sidebar">
        <ul className="sidebar">
        <li className="item"><a class="active" href="/home">Home</a></li>
        <li className="item" ><a href="/scoreboard">Scoreboard</a></li>
        <li className="item"><a  href="/dashboard">Dashboard</a></li>
        <li className="item"><a  href="/help-module">Help Module</a></li>
        <li className="item"><a  href="/achievements">Achievements</a></li>
        <li className="item"><a  href="/feedback">Feedback</a></li>
    </ul>
    </aside>
    )
}