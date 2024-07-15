import React, { useState, useEffect, useCallback } from 'react';
import './CarGame.css';
import $ from 'jquery';

const getRandomLeftPosition = (enemyCars) => {
  const container = $('#container');
  const containerWidth = parseInt(container.css('width'));
  const carWidth = 50; // Assuming each car is 50px wide
  let position;

  // Generate a random position that doesn't overlap with existing cars
  do {
    position = Math.floor(Math.random() * (containerWidth - carWidth)) + 'px';
  } while (enemyCars.some(car => car.left === position));

  return position;
};

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
  const [enemyCars, setEnemyCars] = useState([
    { id: 'car-1', color: 'green', top: -100, left: getRandomLeftPosition([]) },
    { id: 'car-2', color: 'red', top: -200, left: getRandomLeftPosition([]) },
    { id: 'car-3', color: '#26c5ff', top: -350, left: getRandomLeftPosition([]) },
  ]);
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
          setEnemyCars((state) => [
            ...state,
            {
              id: 'car-4',
              color: '#26c5ff',
              top: -350,
              left: getRandomLeftPosition([])
            }
          ]);
          
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
    const enemyCarElems = enemyCars.map(car => document.getElementById(car.id));

    if (enemyCarElems.some(enemyCar => checkCollision(carElem, enemyCar))) {
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
        {enemyCars.map((car) => (
          <Car key={car.id} id={car.id} color={car.color} top={car.top} left={car.left} />
        ))}
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
