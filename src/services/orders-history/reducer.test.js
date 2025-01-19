import { ordersSlice, initialState } from './reducer'
import { WebsocketStatus } from '../../utils/interfaces'
import { generateHistoryOrder } from '../__test__/mocks'

describe('ordersSlice reducers', () => {
  it('should create an action to set orders', () => {
    const newOrders = [generateHistoryOrder()]
    const action = ordersSlice.actions.setOrders(newOrders)

    const newState = ordersSlice.reducer(initialState, action)

    expect(newState.orders).toEqual(newOrders)
  })

  it('should create an action to set totals', () => {
    const { total, totalToday } = (5, 10)
    const action = ordersSlice.actions.setOrders({ total, totalToday })

    const newState = ordersSlice.reducer(initialState, action)

    expect(newState.totalToday).toEqual(totalToday)
    expect(newState.total).toEqual(total)
  })

  it('should handle onOpen action', () => {
    const action = { type: 'ORDERS_OPEN' }

    const newState = ordersSlice.reducer(initialState, action)

    expect(newState.status).toEqual(WebsocketStatus.ONLINE)
  })

  it('should handle onConnecting action', () => {
    const action = { type: 'ORDERS_CONNECTING' }

    const newState = ordersSlice.reducer(initialState, action)

    expect(newState.status).toEqual(WebsocketStatus.CONNECTING)
  })

  it('should handle onClose action', () => {
    const action = { type: 'ORDERS_CLOSE' }

    const newState = ordersSlice.reducer(initialState, action)

    expect(newState.status).toEqual(WebsocketStatus.OFFLINE)
  })

  it('should handle onMessage action with success and orders', () => {
    const newOrders = [generateHistoryOrder(), generateHistoryOrder(), generateHistoryOrder()]
    const { total, totalToday } = (2, 8)
    const action = {
      type: 'ORDERS_MESSAGE',
      payload: {
        success: true,
        orders: newOrders,
        totalToday,
        total,
      }
    }

    const newState = ordersSlice.reducer(initialState, action)

    expect(newState.orders).toEqual(newOrders)
    expect(newState.totalToday).toEqual(totalToday)
    expect(newState.total).toEqual(total)
  })
})
