import React, { useState, useEffect, useCallback, useRef } from 'react';
import './CarGame.css';
import QuestionModal from "../components/QuestionModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import $ from 'jquery'
import Axios from '../Axios';
import { blue } from '@mui/material/colors';

const getRandomLeftPosition = (enemyCars) => {
  const container = $('#container-road');
  const containerWidth = parseInt(container.css('width'));
  const carWidth = 50; // Assuming each car is 50px wide
  let position;

  // Generate a random position that doesn't overlap with existing cars
  do {
    position = Math.floor(Math.random() * (containerWidth - carWidth)) + 'px';
  } while (enemyCars.some(car => car.left === position));

  return position;
};

const Car = React.forwardRef(({ id, color, top, left }, ref) => (
  <div className="car" id={id} ref={ref} style={{ top, left, background: color }}>
    <div className="f-glass"></div>
    <div className="f-light-l"></div>
    <div className="f-light-r"></div>
    <div className="f-tyre-l"></div>
    <div className="f-tyre-r"></div>
    <div className="b-tyre-l"></div>
    <div className="b-tyre-r"></div>
    <div className="b-glass"></div>
  </div>
));

const Line = ({ id, top }) => (
  <div className="line" id={id} style={{ top }}></div>
);

const Coin = ({ id, top, left }) => (
  <div className="coin" id={id} style={{ top, left }}></div>
);

const CarGame = () => {
  const navigate = useNavigate();
  const items = useSelector(state => state.example.items);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [carSpeed, setCarSpeed] = useState(10);
  const [lineSpeed, setLineSpeed] = useState(5);
  const [carPosition, setCarPosition] = useState({ bottom: 10, left: '60%' });
  const [enemyCars, setEnemyCars] = useState([
    { id: 'car-1', color: 'green', top: -100, left: getRandomLeftPosition([]) },
    { id: 'car-2', color: 'red', top: -200, left: getRandomLeftPosition([]) },
    { id: 'car-3', color: '#26c5ff', top: -350, left: getRandomLeftPosition([]) },
  ]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [i, setI] = useState(0);
  const [coins, setCoins] = useState([
    { id: 'coin-1', top: -150, left: '50px' },
    { id: 'coin-2', top: -300, left: '150px' },
  ]);
  const [line1Top, setLine1Top] = useState(-150);
  const [line2Top, setLine2Top] = useState(150);
  const [line3Top, setLine3Top] = useState(450);

  const carRef = useRef(null);
  const containerRef = useRef(null);
  const example=useSelector((state)=>state.example)


  const handleKeyDown = useCallback((e) => {
    if (!gameOver && !showQuiz) {
      const container = containerRef.current;
      const car = carRef.current;
      if (!container || !car) return; // Ensure elements are available
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const carWidth = car.offsetWidth;
      const carHeight = car.offsetHeight;

      switch (e.which) {
        case 37: // left arrow
          if (parseInt(car.style.left) > 20) {
            setCarPosition((pos) => ({ ...pos, left: `${parseInt(pos.left) - 20}px` }));
          }
          break;
        case 39: // right arrow
          if (parseInt(car.style.left) < (containerWidth - carWidth - 20)) {
            setCarPosition((pos) => ({ ...pos, left: `${parseInt(pos.left) + 20}px` }));
          }
          break;
        case 38: // up arrow
          if (parseInt(car.style.bottom) < (containerHeight - carHeight - 20)) {
            setCarPosition((pos) => ({ ...pos, bottom: pos.bottom + 20 }));
          }
          break;
        case 40: // down arrow
          if (parseInt(car.style.bottom) > 0) {
            setCarPosition((pos) => ({ ...pos, bottom: pos.bottom - 20 }));
          }
          break;
        default:
          break;
      }
    } else if (e.which === 13) {
      window.location.reload(true);
    }
  }, [gameOver, showQuiz]);

  const closeModal = () => {
    setShowQuiz(false);
    window.addEventListener('keydown', handleKeyDown);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!gameOver && !showQuiz) {
        setScore((prevScore) => prevScore + 1);
        if (score % 300 === 0) {
          setShowQuiz(true);
          setCarSpeed((speed) => speed + 1);
          setLineSpeed((speed) => speed + 1);
        }

        setEnemyCars((prevCars) => 
          prevCars.map(car => {
            if (car.top > 700) {
              return { ...car, top: -60, left: getRandomLeftPosition(prevCars) };
            } else {
              return { ...car, top: car.top + carSpeed };
            }
          })
        );

        setCoins((prevCoins) =>
          prevCoins.map(coin => {
            if (coin.top > 700) {
              return { ...coin, top: -60, left: getRandomLeftPosition([...enemyCars.map(c => c.left), ...prevCoins.map(c => c.left)], containerRef.current.offsetWidth) };
            } else {
              return { ...coin, top: coin.top + carSpeed };
            }
          })
        );

        setLine1Top((top) => (top > 850 ? -300 : top + lineSpeed));
        setLine2Top((top) => (top > 850 ? -300 : top + lineSpeed));
        setLine3Top((top) => (top > 850 ? -300 : top + lineSpeed));
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, [gameOver, score, carSpeed, lineSpeed, showQuiz, enemyCars]);

  const handleScore=()=>{
    Axios.post('/api/update-score',{score:score,game_id:4,level:example.level}).then(({ data }) => {
      console.log(data)
   }).catch(({ response }) => {
   })
  }

  const checkCollision = (car1, car2) => {
    const x1 = car1.offsetLeft,
      y1 = car1.offsetTop,
      x2 = car2.offsetLeft,
      y2 = car2.offsetTop,
      h1 = car1.offsetHeight,
      w1 = car1.offsetWidth,
      h2 = car2.offsetHeight,
      w2 = car2.offsetWidth,
      b1 = y1 + h1,
      r1 = x1 + w1,
      b2 = y2 + h2,
      r2 = x2 + w2;
    return !(b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2);
  };

  useEffect(() => {
    if (!showQuiz) {
      const carElem = carRef.current;
      const enemyCarElems = enemyCars.map(car => document.getElementById(car.id));
      const coinElems = coins.map(coin => document.getElementById(coin.id));

      if (carElem && enemyCarElems.some(enemyCar => checkCollision(carElem, enemyCar))) {
        setGameOver(true);
      }

      if (carElem) {
        coinElems.forEach((coin, index) => {
          if (checkCollision(carElem, coin)) {
            setCoins((prevCoins) => prevCoins.filter((_, i) => i !== index));
            setScore((prevScore) => prevScore + 50);
          }
        });
      }
    }
  }, [enemyCars, coins, showQuiz]);

  return (
    <div className="App">
      <div id="score-div">
        <span> Score :</span>
        <span id="score">{score}</span>
      </div>
      <div id="container-road" ref={containerRef}>
        <Line id="line-1" top={line1Top} />
        <Line id="line-2" top={line2Top} />
        <Line id="line-3" top={line3Top} />
        <Car ref={carRef} id="car" color="blanchedalmond" top="auto" left={carPosition.left} />
        {!showQuiz && enemyCars.map((car) => (
          <Car key={car.id} id={car.id} color={car.color} top={car.top} left={car.left} />
        ))}
        {coins.map((coin) => (
          <Coin key={coin.id} id={coin.id} top={coin.top} left={coin.left} />
        ))}
        {gameOver && (
          <div style={{display:'flex'}}id="restart-div">
            <h4 style={{color:'white',fontSize:20}}>Game Over !!!!!!!</h4>
            <button style={{ cursor: 'pointer',width:100,height:50 ,backgroundColorcolor:'blue'}} id="restart" onClick={() =>{handleScore(); navigate("/home")}}>
              Home
            </button>
          </div>
        )}
      </div>
      {showQuiz && <QuestionModal onClose={closeModal} questionData={items?.questions[i]} />}
    </div>
  );
};

export default CarGame;
