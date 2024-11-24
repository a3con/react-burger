import { createAsyncThunk } from '@reduxjs/toolkit'
import { endpoints, requestWithRefresh } from '../../utils/api'
import type { IResponseSuccess } from '../../utils/api'
import type { IStateOrder } from './reducer'

export interface IOrderNumberRequest extends IResponseSuccess {
  name: string
  order: {
    number: number
  }
}

export const requestOrderNumber = createAsyncThunk(
  'burgerConstructor/requestOrderNumber',
  async (_, { getState }) => {
    const {
      order: { bun, ingredients },
    } = getState() as { order: IStateOrder }

    const ids = bun
      ? [bun._id, ...ingredients.map(i => i._id), bun._id]
      : [...ingredients.map(ingredient => ingredient._id)]

    const headers = new Headers()
    headers.append('Content-Type', 'application/json; charset=utf-8')
    headers.append('Authorization', localStorage.getItem('accessToken') || '')

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        ingredients: ids,
      }),
    }

    const response = await requestWithRefresh<IOrderNumberRequest>(
      endpoints.orders,
      requestOptions,
    )

    const orderNumber = response.order.number

    return orderNumber
  },
)
