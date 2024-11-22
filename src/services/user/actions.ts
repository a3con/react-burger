import { createAsyncThunk } from '@reduxjs/toolkit'
import { api, endpoints, request, requestWithRefresh } from '../../utils/api'
import { setIsAuthChecked, setUser } from './reducer'
import { IUser } from '../../utils/interfaces'

export interface IResponseSuccess {
  success: boolean
  message?: string
}

export interface IRefreshTokenResponse extends IResponseSuccess {
  accessToken: string
  refreshToken: string
}

export interface IUserResponse extends IRefreshTokenResponse {
  user: IUser
}

export const register = createAsyncThunk(
  'user/register',
  async ({
    password,
    email,
    name,
  }: {
    password: string
    email: string
    name: string
  }) => {
    return api.register({ email, password, name })
  },
)

/* Response
{
  "success": true,
  "user": {
      "email": "email",
      "name": "name"
  },
  "accessToken": "Bearer token...",
  "refreshToken": "refreshToken..."
}
*/
export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await request<IUserResponse>(endpoints.login, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ email, password }),
    })
    console.log('LOGIN:', response)
    localStorage.setItem('accessToken', response.accessToken)
    localStorage.setItem('refreshToken', response.refreshToken)
    return response.user
  },
)

export const logout = createAsyncThunk('user/logout', async () => {
  const token = localStorage.getItem('refreshToken')
  await request(endpoints.logout, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ token }),
  })
  console.log('LOGOUT:')
  //очистка заказа ???
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
})

/* Response
{"success":true,"user":{"email":"email","name":"name"}}
*/
// export const getUser = createAsyncThunk('user/getUser', async () => {
//   const response = await requestWithRefresh<IUserResponse>(endpoints.user, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json; charset=utf-8',
//       Authorization: localStorage.getItem('accessToken') || '',
//     },
//   })
//   console.log('GET_USER:', response)
//   return response.user
// })

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

export const patchUser = createAsyncThunk(
  'user/pathUser',
  async (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    { dispatch },
  ) => {
    const response = await requestWithRefresh<IUserResponse>(endpoints.user, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: localStorage.getItem('accessToken') || '',
      },
      body: JSON.stringify({ name, email, password }),
    })
    console.log('PATCH_USER:', response)
    dispatch(setUser(response.user))
    return response.user
  },
)
