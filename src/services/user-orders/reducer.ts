import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IOrder, WebsocketStatus } from '../../utils/interfaces'
import { socketMiddleware } from '../middleware/ws-middleware'
import { UserOrdersActions } from './actions'

interface UserOrdersState {
  status: WebsocketStatus
  userOrders: IOrder[]
}

export const initialState: UserOrdersState = {
  status: WebsocketStatus.OFFLINE,
  userOrders: [],
}

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    setUserOrders: (state, action: PayloadAction<IOrder[]>) => {
      state.userOrders = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(UserOrdersActions.onConnecting, state => {
        state.status = WebsocketStatus.CONNECTING
      })
      .addCase(UserOrdersActions.onOpen, state => {
        state.status = WebsocketStatus.ONLINE
      })
      .addCase(UserOrdersActions.onClose, state => {
        state.status = WebsocketStatus.OFFLINE
      })
      .addCase(UserOrdersActions.onMessage, (state, action) => {
        const data = action.payload
        if (data.success && data.orders) {
          if (data.orders) {
            state.userOrders = data.orders.filter(order => {
              return (
                Array.isArray(order.ingredients) &&
                order.ingredients.every(i => typeof i === 'string')
              )
            })
          }
        }
      })
  },
})

export const userOrdersMiddleware = socketMiddleware(UserOrdersActions, true)
export const { setUserOrders } = userOrdersSlice.actions
