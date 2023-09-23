const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return action.payload
    case 'OK':
      return action.payload
    case 'BAD':
      return action.payload
    case 'ZERO':
      return state
    default: return state
  }
  
}

export default counterReducer
