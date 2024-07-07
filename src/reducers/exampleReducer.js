// src/reducers/exampleReducer.js
const initialState = {
    items: []
  };
  
  const exampleReducer = (state = initialState, action) => {
    console.log(action.type,"action")
    console.log(action.payload)
    switch (action.type) {
     
      case 'ADD':
        return {
          items: action.payload
        };
        case 'LEVEL':
          return{
            level:action.payload
          }
      default:
        return state;
    }
  };
  
  export default exampleReducer;