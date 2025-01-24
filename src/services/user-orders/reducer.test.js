import { initialState, userOrdersSlice, setUserOrders } from './reducer'
import { WebsocketStatus } from '../../utils/interfaces'
import { generateHistoryOrder } from '../__test__/mocks'

describe('userOrdersSlice reducers', () => {
  it('should create an action to set user orders', () => {
    const newUserOrders = [generateHistoryOrder()]
    const action = setUserOrders(newUserOrders)

    const newState = userOrdersSlice.reducer(initialState, action)

    expect(newState.userOrders).toEqual(newUserOrders)
  })

  it('should handle onOpen action', () => {
    const action = { type: 'USER_ORDERS_OPEN' }

    const newState = userOrdersSlice.reducer(initialState, action)

    expect(newState.status).toEqual(WebsocketStatus.ONLINE)
  })

  it('should handle onConnecting action', () => {
    const action = { type: 'USER_ORDERS_CONNECTING' }

    const newState = userOrdersSlice.reducer(initialState, action)

    expect(newState.status).toEqual(WebsocketStatus.CONNECTING)
  })

  it('should handle onClose action', () => {
    const action = { type: 'USER_ORDERS_CLOSE' }

    const newState = userOrdersSlice.reducer(initialState, action)

    expect(newState.status).toEqual(WebsocketStatus.OFFLINE)
  })

  it('should handle onMessage action with success and orders', () => {
    const newOrders = [generateHistoryOrder(), generateHistoryOrder()]
    const action = {
      type: 'USER_ORDERS_MESSAGE',
      payload: {
        success: true,
        orders: newOrders,
      },
    }

    const newState = userOrdersSlice.reducer(initialState, action)

    expect(newState.userOrders).toEqual(newOrders)
  })

  it('should handle onMessage action with failed', () => {
    const newOrders = [generateHistoryOrder(), generateHistoryOrder()]
    const action = {
      type: 'USER_ORDERS_MESSAGE',
      payload: {
        success: false,
        orders: newOrders,
      },
    }

    const newState = userOrdersSlice.reducer(initialState, action)

    expect(newState.userOrders).toEqual([])
  })
})
