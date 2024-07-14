import React, { useState, useEffect, useCallback } from 'react';
import './CarGame.css';
import $ from 'jquery';

const Car = ({ id, color, top, left }) => (
  <div className="car" id={id} style={{ top, left, background: color }}>
    <div className="f-glass"></div>
    <div className="f-light-l"></div>
    <div className="f-light-r"></div>
    <div className="f-tyre-l"></div>
    <div className="f-tyre-r"></div>
    <div className="b-tyre-l"></div>
    <div className="b-tyre-r"></div>
    <div className="b-glass"></div>
  </div>
);

const Line = ({ id, top }) => (
  <div className="line" id={id} style={{ top }}></div>
);

const CarGame = () => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [carSpeed, setCarSpeed] = useState(10);
  const [lineSpeed, setLineSpeed] = useState(5);
  const [carPosition, setCarPosition] = useState({ bottom: 10, left: '60%' });
  const [car1Top, setCar1Top] = useState(-100);
  const [car2Top, setCar2Top] = useState(-200);
  const [car3Top, setCar3Top] = useState(-350);
  const [line1Top, setLine1Top] = useState(-150);
  const [line2Top, setLine2Top] = useState(150);
  const [line3Top, setLine3Top] = useState(450);

  const handleKeyDown = useCallback((e) => {
    if (!gameOver) {
      const container = $('#container');
      const car = $('#car');
      const containerWidth = parseInt(container.css('width'));
      const containerHeight = parseInt(container.css('height'));
      const carWidth = parseInt(car.css('width'));
      const carHeight = parseInt(car.css('height'));

      switch (e.which) {
        case 37: // left arrow
          if (parseInt(car.css('left')) > 20) {
            setCarPosition((pos) => ({ ...pos, left: `${parseInt(pos.left) - 20}px` }));
          }
          break;
        case 39: // right arrow
          if (parseInt(car.css('left')) < (containerWidth - carWidth - 20)) {
            setCarPosition((pos) => ({ ...pos, left: `${parseInt(pos.left) + 20}px` }));
          }
          break;
        case 38: // up arrow
          if (parseInt(car.css('bottom')) < (containerHeight - carHeight - 20)) {
            setCarPosition((pos) => ({ ...pos, bottom: pos.bottom + 20 }));
          }
          break;
        case 40: // down arrow
          if (parseInt(car.css('bottom')) > 0) {
            setCarPosition((pos) => ({ ...pos, bottom: pos.bottom - 20 }));
          }
          break;
        default:
          break;
      }
    } else if (e.which === 13) {
      window.location.reload(true);
    }
  }, [gameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!gameOver) {
        setScore((prevScore) => prevScore + 1);
        if (score % 300 === 0) {
          setCarSpeed((speed) => speed + 1);
          setLineSpeed((speed) => speed + 1);
        }

        setCar1Top((top) => (top > 700 ? -60 : top + carSpeed));
        setCar2Top((top) => (top > 700 ? -60 : top + carSpeed));
        setCar3Top((top) => (top > 700 ? -60 : top + carSpeed));
        setLine1Top((top) => (top > 850 ? -300 : top + lineSpeed));
        setLine2Top((top) => (top > 850 ? -300 : top + lineSpeed));
        setLine3Top((top) => (top > 850 ? -300 : top + lineSpeed));
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, [gameOver, score, carSpeed, lineSpeed]);

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
    const carElem = document.getElementById('car');
    const car1Elem = document.getElementById('car-1');
    const car2Elem = document.getElementById('car-2');
    const car3Elem = document.getElementById('car-3');

    if (checkCollision(carElem, car1Elem) || checkCollision(carElem, car2Elem) || checkCollision(carElem, car3Elem)) {
      setGameOver(true);
    }
  });

  return (
    <div className="App">
      <div id="score-div">
        <span> Score :</span>
        <span id="score">{score}</span>
      </div>
      <div id="container">
        <Line id="line-1" top={line1Top} />
        <Line id="line-2" top={line2Top} />
        <Line id="line-3" top={line3Top} />
        <Car id="car" color="blanchedalmond" top="auto" left={carPosition.left} />
        <Car id="car-1" color="green" top={car1Top} left="60%" />
        <Car id="car-2" color="red" top={car2Top} left="40%" />
        <Car id="car-3" color="#26c5ff" top={car3Top} left="45%" />
        {gameOver && (
          <div id="restart-div">
            <button id="restart" onClick={() => window.location.reload(true)}>
              Click To Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarGame;
