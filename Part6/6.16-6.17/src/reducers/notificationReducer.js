import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
  name: 'notification',
  initialState: "Hello User!",
  reducers: {
    notificationChange(state, action){

        return "You voted '" + action.payload + " '"
    },
    notificationReset(state, action)
    {
        return "Hello User!"
    }

    
  },
})

  
export const { notificationChange, notificationReset  } = notificationSlice.actions
export default notificationSlice.reducer