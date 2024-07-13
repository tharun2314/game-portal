// src/reducers/index.js
import { combineReducers } from 'redux';
// import your individual reducers
import exampleReducer from './exampleReducer';
import marioReducer from "../Pages/config/redux/marioSlice";
import obstacleReducer from "../Pages/config/redux/obstacleSlice";
import engineReducer from "../Pages/config/redux/engineSlice";

const rootReducer = combineReducers({
  example: exampleReducer,
  mario: marioReducer,
  obstacle: obstacleReducer,
  engine: engineReducer,
});

export default rootReducer;