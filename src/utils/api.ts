import { catchError } from '../utils/catchError'
import { IUser } from '../utils/interfaces'

export const BASE_URL_API = 'https://norma.nomoreparties.space/api'

export const endpoints = {
  ingredients: BASE_URL_API + '/ingredients', // POST
  orders: BASE_URL_API + '/orders', // POST
  passwordReset: BASE_URL_API + '/password-reset', // POST !
  passwordUpdate: BASE_URL_API + '/password-reset/reset', // POST !
  register: BASE_URL_API + '/auth/register', // POST
  login: BASE_URL_API + '/auth/login', // POST
  logout: BASE_URL_API + '/auth/logout', // POST
  token: BASE_URL_API + '/auth/token', // POST !
  user: BASE_URL_API + '/auth/user', // GET | PATCH
}

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

// res.json() as Promise<T> ?
const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`)
}

const checkSuccess = <T extends IResponseSuccess>(res: T): Promise<T> => {
  return res.success ? Promise.resolve(res) : Promise.reject(res)
}

export const request = <T extends IResponseSuccess>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  return fetch(url, options)
    .then(checkResponse<T>)
    .then(checkSuccess<T>)
}

export const requestWithRefresh = async <T extends IResponseSuccess>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  const [error, data] = await catchError(request<T>(url, options))
  if (data) return data
  if (error?.message === 'jwt expired') {
    const [refreshError, refreshData] = await catchError(refreshToken()) // update tokens
    if (refreshError) return Promise.reject(refreshError)
    options.headers = {
      ...options.headers,
      authorization: refreshData.accessToken,
    }
    return await request(url, options) // repeat request
  }
  return Promise.reject(error)
}

export const refreshToken = async () => {
  const [error, refreshData] = await catchError(
    request<IRefreshTokenResponse>(endpoints.token, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    }),
  )
  if (error) return Promise.reject(error)
  localStorage.setItem('refreshToken', refreshData.refreshToken)
  localStorage.setItem('accessToken', refreshData.accessToken)
  return refreshData
}

// TODO: Перенести в src/services/user/actions.ts
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
export const register = async ({
  password,
  email,
  name,
}: {
  password: string
  email: string
  name: string
}) => {
  const response = await request<IUserResponse>(endpoints.register, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ email, password, name }),
  })
  localStorage.setItem('refreshToken', response.refreshToken)
  localStorage.setItem('accessToken', response.accessToken)
  return response.user
}

export const updatePassword = async ({
  newPassword,
  confirmCode,
}: {
  newPassword: string
  confirmCode: string
}) => {
  return await request<IResponseSuccess>(endpoints.passwordUpdate, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      password: newPassword,
      token: confirmCode,
    }),
  })
}

export const resetPassword = async ({ email }: { email: string }) => {
  return await request<IResponseSuccess>(endpoints.passwordReset, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
}

// TODO: Перенести в src/services/user/actions.ts
export const login = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const response = await request<IUserResponse>(endpoints.login, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ email, password }),
  })
  localStorage.setItem('accessToken', response.accessToken)
  localStorage.setItem('refreshToken', response.refreshToken)
  return response.user
}

// TODO: Перенести в src/services/user/actions.ts
export const logout = async (): Promise<void> => {
  const token = localStorage.getItem('refreshToken')
  await request(endpoints.logout, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ token }),
  })
  //очистка заказа ???
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

// TODO: Перенести в src/services/user/actions.ts
/* Response
{"success":true,"user":{"email":"email","name":"name"}}
*/
export const getUser = async () => {
  const response = await requestWithRefresh<IUserResponse>(endpoints.user, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: localStorage.getItem('accessToken') || '',
    },
  })
  return response.user
}

export const api = {
  getUser,
  register,
  logout,
  login,
}
