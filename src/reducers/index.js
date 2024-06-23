// src/reducers/index.js
import { combineReducers } from 'redux';
// import your individual reducers
import exampleReducer from './exampleReducer';

const rootReducer = combineReducers({
  example: exampleReducer,
  // add other reducers here
});

export default rootReducer;