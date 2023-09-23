const filterReducer = (state = '', action) => {
    
    if(action.type === 'NEW_FILTER')  
        return action.payload
    else
        return state 
}



export const filterChange = (filter) => {

    return {
      type: 'NEW_FILTER',
      payload: filter
    }
  }
  
export default filterReducer