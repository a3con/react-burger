import { IUser } from '../utils/interfaces'

export const BASE_URL_API = 'https://norma.nomoreparties.space/api/'

export const endpoints = {
  ingredients: BASE_URL_API + 'ingredients', // POST
  orders: BASE_URL_API + 'orders', // POST
  passwordReset: BASE_URL_API + 'password-reset', // POST
  resetPassword: BASE_URL_API + 'password-reset/reset', // POST
  register: BASE_URL_API + 'auth/register', // POST
  login: BASE_URL_API + 'auth/login', // POST
  logout: BASE_URL_API + 'auth/logout', // POST
  token: BASE_URL_API + 'auth/token', // POST
  user: BASE_URL_API + 'auth/user', // GET | PATCH
}

export interface IResponseSuccess {
  success: boolean
  message?: string
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

export const getUser = async (): Promise<IUser> => {
  const request: Promise<IUser> = new Promise(resolve => {
    setTimeout(() => {
      resolve({})
    }, 1000)
  })

  try {
    return await request
  } catch (error) {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    throw error
  }
}

export const login = (): Promise<IUser> =>
  new Promise(resolve => {
    setTimeout(() => {
      localStorage.setItem('accessToken', 'test-token')
      localStorage.setItem('refreshToken', 'test-refresh-token')
      resolve({})
    }, 1000)
  })

export const logout = (): Promise<void> =>
  new Promise(resolve => {
    setTimeout(() => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      resolve()
    }, 1000)
  })

export const requestWithRefresh2 = (url: string, options: RequestInit) => {
  return fetchWithRefresh(url, options)
}

export const requestWithRefresh = <T extends IResponseSuccess>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  return fetchWithRefresh(url, options)
}

export const refreshToken = () => {
  return fetch(endpoints.token, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then(checkResponse)
}

export const fetchWithRefresh = async <T extends IResponseSuccess>(
  url: string,
  options: RequestInit,
) => {
  try {
    //const res = await fetch(url, options)
    //return await checkResponse(res)
    return await fetch(url, options)
      .then(checkResponse<T>)
      .then(checkSuccess<T>)
  } catch (err) {
    // Specify the type after the colon, not before
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken()
      if (!refreshData.success) {
        return Promise.reject(refreshData)
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken)
      localStorage.setItem('accessToken', refreshData.accessToken)
      options.headers = {
        ...options.headers,
        authorization: refreshData.accessToken,
      }
      const res = await fetch(url, options)
      return await checkResponse(res)
    } else {
      return Promise.reject(err)
    }
  }
}

export const api = {
  fetchWithRefresh,
  getUser,
  logout,
  login,
}
