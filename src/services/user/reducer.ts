import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { login, logout } from './actions'
import { IUser } from '../../utils/interfaces'

type IUserState = {
  user: IUser | null
  isAuthChecked: boolean
  //loading: boolean
  //error: string | null
}

const initialState: IUserState = {
  user: null,
  isAuthChecked: false,
  //loading: false,
  //error: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload
    },
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload
    },
  },
  selectors: {
    getIsAuthChecked: state => state.isAuthChecked,
    //getUserState: state => state,
    getUser: state => state.user,
  },
  extraReducers: builder => {
    builder
      // .addCase(patchUser.pending, state => {
      //   state.loading = true
      //   state.error = null
      // })
      // .addCase(patchUser.fulfilled, (state, action) => {
      //   state.user = action.payload
      //   state.loading = false
      //   state.error = null
      // })
      // .addCase(patchUser.rejected, (state, action) => {
      //   state.loading = false
      //   state.error = action.error.message || null
      // })
      // .addCase(login.pending, state => {
      //   state.loading = true
      //   state.error = null
      // })
      // .addCase(login.rejected, (state, action) => {
      //   state.loading = false
      //   state.error = action.error.message || null
      // })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuthChecked = true
        //state.loading = false
        //state.error = null
      })
      .addCase(logout.fulfilled, state => {
        state.user = null
      })
  },
})

export const { setIsAuthChecked, setUser } = userSlice.actions
export const { getIsAuthChecked, getUser } = userSlice.selectors
