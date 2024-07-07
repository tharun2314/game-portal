import "./Header.css"
export default function Sidebar()
{
    return(
        <aside className="sidebar">
        <ul className="sidebar">
        <li className="item"><a class="active" href="/home">Home</a></li>
        <li className="item" ><a href="/scoreboard">Scoreboard</a></li>
        <li className="item"><a >Dashboard</a></li>
        <li className="item"><a >Help Module</a></li>
    </ul>
    </aside>
    )
}