
export const addItem = item => {
    console.log(item,"itembro")
    
    return {
    type: 'ADD',
    payload: item
  }};

  export const addLevel=level=>{
    return{
      type:'LEVEL',
      payload:level
    }
  }
