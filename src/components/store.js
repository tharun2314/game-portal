// import { createStore,configureStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers'; // assuming you have a root reducer

const store = configureStore({
    reducer: rootReducer,
    // Add middleware, enhancers, or dev tools setup as needed
  });
  

export default store;