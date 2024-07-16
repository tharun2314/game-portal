// src/reducers/exampleReducer.js
const initialState = {
    items: []
  };
  
  const exampleReducer = (state = initialState, action) => {
    console.log(action.type,"action")
    console.log(action.payload)
    switch (action.type) {
     
      case 'ADD':
        console.log("i am heree")
        return {
          ...state,
          items: action.payload
        };
        case 'LEVEL':
          return{
            ...state,
            level:action.payload
          }
      default:
        return state;
    }
  };
  
  export default exampleReducer;