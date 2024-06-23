
export const addItem = item => {
    console.log(item,"itembro")
    
    return {
    type: 'ADD',
    payload: item
  }};
