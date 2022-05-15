// redux toolkit user slice
// Language: javascript
import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    currentUserData: {},
    loading: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setCurrentUserData: (state, action) => {
      state.currentUserData = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    logoutUser: (state,action)=>{
      state.user = null
      state.currentUserData = {}
    }
  },
})

export const { setUser, setLoading, logoutUser, setCurrentUserData } = userSlice.actions
export default userSlice.reducer
