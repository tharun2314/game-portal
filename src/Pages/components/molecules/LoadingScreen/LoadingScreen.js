import { useEffect, useState } from "react";
import MarioCharacter from "../../../assets/img/mario.png";
import "./LoadingScreen.css";
import { setLoadingScreen,setReady} from "../../../config/redux/engineSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoadingScreen = () => {
  const [isReady, setIsReady] = useState(false);
  const navigate=useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 5000);
  }, []);

  const handleGame=()=>
  {
    dispatch(setLoadingScreen(false))
    dispatch(setReady(true))
    // navigate('/mario-loading')
  }

  return (
    <div className="loading-screen-container">
      <img src={MarioCharacter} alt="" className="loading-mario" />
      {!isReady && <h1 className="loading-title">Loading...</h1>}
      {isReady && (
        <button
          className="enter-button"
          onClick={handleGame }
        >
          ENTER
        </button>
      )}
    </div>
  );
};
export default LoadingScreen;
