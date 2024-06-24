import React, { Component } from "react";
import Snake from "./Snake";
import Food from "./Food";
import Button from "./Button";
import Menu from "./Menu";
import "./snakegame.css";
import QuestionModal from "../QuestionModal";
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux'
import { addItem, removeItem, updateItem } from '../actions/itemActions';
const getRandomFood = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

const initialState = {
  food: getRandomFood(),
  direction: "RIGHT",
  speed: 100,
  route: "menu",
  snakeDots: [[0, 0], [0, 2]],
  score:0,
  showQuiz:false,
  i:0
};
let startGame;
let stopGame;

class Snakegame extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    startGame = setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.onSnakeOutOfBounds();
    this.onSnakeCollapsed();
    this.onSnakeEats();
    if (this.state.showQuiz) {
      clearInterval(startGame);
    }
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 39:
        this.setState({ direction: "RIGHT" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
    }
  };

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];
    if (this.state.route === "game") {
      switch (this.state.direction) {
        case "RIGHT":
          head = [head[0] + 2, head[1]];
          break;
        case "LEFT":
          head = [head[0] - 2, head[1]];
          break;
        case "DOWN":
          head = [head[0], head[1] + 2];
          break;
        case "UP":
          head = [head[0], head[1] - 2];
          break;
      }
      dots.push(head);
      dots.shift();
      this.setState({
        snakeDots: dots,
      });
    }
  };

  onSnakeOutOfBounds() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (this.state.route === "game") {
      if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
        this.gameOver();
      }
    }
  }

  onSnakeCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        this.gameOver();
      }
    });
  }

  onSnakeEats() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      console.log("I am heree");
      this.setState(
        (prevState) => ({
          food: getRandomFood(),
          score: prevState.score + 1,
        }),
        () => {
          if (this.state.score % 2 == 0) {
            this.setState({
              showQuiz: true,
            });
          } else {
            this.increaseSnake();
            this.increaseSpeed();
          }
        }
      );
    }
  }

  increaseSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake,
    });
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 20,
      });
    }
  }

  onRouteChange = () => {
    this.setState({
      route: "game",
    });
    console.log(this.props.items,"data")
  };

  gameOver() {
    alert(`GAME OVER, your score is ${this.state.snakeDots.length - 2}`);
    this.setState(initialState);
  }

  onDown = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    head = [head[0], head[1] + 2];
    dots.push(head);
    dots.shift();
    this.setState({
      direction: "DOWN",
      snakeDots: dots,
    });
  };

  onUp = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    head = [head[0], head[1] - 2];
    dots.push(head);
    dots.shift();
    this.setState({
      direction: "UP",
      snakeDots: dots,
    });
  };

  onRight = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    head = [head[0] + 2, head[1]];
    dots.push(head);
    dots.shift();
    this.setState({
      direction: "RIGHT",
      snakeDots: dots,
    });
  };

  onLeft = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    head = [head[0] - 2, head[1]];
    dots.push(head);
    dots.shift();
    this.setState({
      direction: "LEFT",
      snakeDots: dots,
    });
  };
  closeModal=(data)=>{
    let updatedScore=this.state.score;
    console.log("I am hereee in closeModal")
    console.log("state speed",this.state.speed)
    startGame=setInterval(this.moveSnake,this.state.speed)
    if(data=1)
      {
            updatedScore=this.state.score +10
      }    
       this.setState(prevState=>({showQuiz:false,score:updatedScore,i:prevState?.i+1}))
  };
  render() {
    
    const { route, snakeDots, food,score } = this.state;
    return (
      <div>
        {route === "menu" ? (
          <div>
            <Menu onRouteChange={this.onRouteChange} />
          </div>
        ) : (
          <div>
            <div className="game-area">
              <Snake snakeDots={snakeDots} />
              <Food dot={food} />
              <div style={{position:"relative",top:'-32px'}}>Score:{score}</div>
            </div>
         
          </div>
        )}
 {this.state.showQuiz && <QuestionModal onClose={this.closeModal} questionData={this.props.items?.questions[this.state.i]}/>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.example.items
});

const mapDispatchToProps = {
  addItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(Snakegame);