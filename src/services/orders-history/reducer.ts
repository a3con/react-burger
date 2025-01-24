import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IOrder, WebsocketStatus } from '../../utils/interfaces'
import { socketMiddleware } from '../middleware/ws-middleware'
import { OrdersHistoryActions } from './actions'
import { IOrderResponse } from '../../utils/interfaces'

export interface IOrdersState extends IOrderResponse {
  status?: WebsocketStatus
}

export const initialState: IOrdersState = {
  orders: [],
  total: undefined,
  totalToday: undefined,
  status: WebsocketStatus.OFFLINE,
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<IOrder[]>) => {
      state.orders = action.payload
    },
    setTotals: (
      state,
      action: PayloadAction<{ total: number; totalToday: number }>,
    ) => {
      state.total = action.payload.total
      state.totalToday = action.payload.totalToday
    },
  },
  extraReducers: builder => {
    builder
      .addCase(OrdersHistoryActions.onConnecting, state => {
        state.status = WebsocketStatus.CONNECTING
      })
      .addCase(OrdersHistoryActions.onOpen, state => {
        state.status = WebsocketStatus.ONLINE
      })
      .addCase(OrdersHistoryActions.onClose, state => {
        state.status = WebsocketStatus.OFFLINE
      })
      .addCase(OrdersHistoryActions.onMessage, (state, action) => {
        const data = action.payload
        if (data.success && data.orders) {
          state.orders = data.orders.filter(order => {
            return (
              Array.isArray(order.ingredients) &&
              order.ingredients.every(i => typeof i === 'string')
            )
          })
          state.total = data.total
          state.totalToday = data.totalToday
        }
      })
  },
})

export const ordersHistoryMiddleware = socketMiddleware(OrdersHistoryActions)
export const { setOrders, setTotals } = ordersSlice.actions
