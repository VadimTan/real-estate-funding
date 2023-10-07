import { createSlice } from '@reduxjs/toolkit'
import { userLogin } from './auth.actions'

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const initialState = {
  loading: false,
  isLoggedIn: !!userToken,
  userToken,
  error: null,
  success: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      // console.log('reducer: ', {state, actions})
      state.userToken = null;
      state.isLoggedIn = false;
      localStorage.removeItem('userToken')
      
    }
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.isLoggedIn = true;
      state.userToken = payload.userToken
      state.success = true
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false
      state.isLoggedIn = false;
      state.error = payload
    },
    // register user reducer...
  },
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;