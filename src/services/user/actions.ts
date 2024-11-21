// import { request, endpoints } from '../../utils/api'
// import { createAsyncThunk } from '@reduxjs/toolkit'
// import { IIngredient } from '../../utils/interfaces'
// import type { IResponseSuccess } from '../../utils/api'

// export interface IIngredientsResponse extends IResponseSuccess {
//   data: IIngredient[]
// }

// export const getIngredients = createAsyncThunk(
//   'burgerIngredients/getIngredients',
//   async () => {
//     const ingredients = await request<IIngredientsResponse>(
//       endpoints.ingredients,
//     )
//     return ingredients
//   },
// )

import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../utils/api'
import { setIsAuthChecked, setUser } from './reducer'

export const login = createAsyncThunk('user/login', async () => {
  return api.login()
})

export const logout = createAsyncThunk('user/logout', async () => {
  return api.logout()
})

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (localStorage.getItem('accessToken')) {
      api
        .getUser()
        .then(user => dispatch(setUser(user)))
        .finally(() => dispatch(setIsAuthChecked(true)))
    } else {
      dispatch(setIsAuthChecked(true))
    }
  },
)
