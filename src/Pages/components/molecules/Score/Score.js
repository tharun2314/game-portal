import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScore, setLastScore,setReady } from "../../../config/redux/engineSlice";
import QuestionModal from "../../../../components/QuestionModal";
import "./Score.css";

const Score = () => {
  const score = useSelector(state => state.engine.score);
  const lastScore = useSelector(state => state.engine.lastScore);
  const play = useSelector(state => state.engine.play);
  const die = useSelector(state => state.engine.die);
  const items=useSelector(state=>state.example.items)
  console.log({items})
  const [showQuiz, setShowQuiz] = useState(false)
  const [i,setI]=useState(0);
  const dispatch = useDispatch();


  useEffect(() => {
    if (play && !die) {
      setTimeout(() => {
        dispatch(setScore(score + 1));
      }, 100);

      if (score % 100 == 0 && score != 0) {
        setShowQuiz(true);
        setI((prev)=>prev+1)
        dispatch(setReady(false));
      }
    }
    if (score && !play) {
      dispatch(setLastScore(score));
    }
  }, [dispatch, play, score, lastScore, die]);

  const closeModal=()=>{
    setShowQuiz(false)
  }
  return (
    <><div className="score-container">
      {play && <p className="score">Score: {score}</p>}
      {!play && <p className="score">Score: {lastScore}</p>}
    </div>{showQuiz && <QuestionModal onClose={closeModal} questionData={items?.questions[i]} />}</>
  )
}
export default Score