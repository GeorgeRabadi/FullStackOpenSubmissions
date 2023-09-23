import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
  name: 'notification',
  initialState: "Hello User!",
  reducers: {
    notificationChange(state, action){
      return "Hello User!"
    }
  },
})

  
export const { notificationChange  } = notificationSlice.actions
export default notificationSlice.reducer