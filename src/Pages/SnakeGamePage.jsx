import { useNavigate } from "react-router-dom";
import Snakegame from "../components/NotFound/Snakegame";
export default function SnakeGamePage()
{
    const history = useNavigate();
    const handleNavigate=()=>{
        history('/home');    }
 return(
    <Snakegame  handleNavigate={handleNavigate}/>
 )
}