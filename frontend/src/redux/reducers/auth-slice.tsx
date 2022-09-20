import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../reduxStore';
import { registerUser, loginUser } from '../actions/auth-actions';

const initialState = {
  loading: false,
  userInfo: null, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state: any) => {
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
    },
  },
  extraReducers: {
    // register user
    [registerUser.pending]: (state: any) => {
      state.loading = true
      state.error = null
    },
    [registerUser.fulfilled]: (state: any, { payload }) => {
      state.loading = false
      state.success = true // registration successful
    },
    [registerUser.rejected]: (state: any, { payload }) => {
      state.loading = false
      state.error = payload
    },
    [loginUser.pending]: (state: any) => {
      state.loading = true
      state.error = null
    },
    [loginUser.fulfilled]: (state: any, { payload }) => {
      console.log('payload', payload);
      state.loading = false
      state.userInfo = payload.userEmail
      state.userToken = payload.token
    },
    [loginUser.rejected]: (state: any, { payload }) => {
      state.loading = false
      state.error = payload
    }
  },
})


export const { logout } = userSlice.actions;
export default userSlice