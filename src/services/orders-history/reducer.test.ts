import { initialState, ordersSlice, setOrders, setTotals } from './reducer'
import { WebsocketStatus } from '../../utils/interfaces'
import { generateHistoryOrder } from '../__test__/mocks'

/*
setOrders // OK
setTotals // OK
OrdersHistoryActions.onConnecting // OK
OrdersHistoryActions.onOpen // OK
OrdersHistoryActions.onClose // OK
OrdersHistoryActions.onMessage // OK
*/

describe('ordersSlice reducers', () => {
  it('should create an action to set orders', () => {
    const newOrders = [generateHistoryOrder()]
    const action = setOrders(newOrders)

    const newState = ordersSlice.reducer(initialState, action)

    expect(newState.orders).toEqual(newOrders)
  })

  it('should create an action to set totals', () => {
    const { total, totalToday } = { total: 5, totalToday: 10 }
    const action = setTotals({ total, totalToday })

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
    const newOrders = [generateHistoryOrder(), generateHistoryOrder()]
    const { total, totalToday } = { total: 2, totalToday: 8 }
    const action = {
      type: 'ORDERS_MESSAGE',
      payload: {
        success: true,
        orders: newOrders,
        totalToday,
        total,
      },
    }

    const newState = ordersSlice.reducer(initialState, action)

    expect(newState.orders).toEqual(newOrders)
    expect(newState.totalToday).toEqual(totalToday)
    expect(newState.total).toEqual(total)
  })

  it('should handle onMessage action with failed', () => {
    const newOrders = [generateHistoryOrder(), generateHistoryOrder()]
    const { total, totalToday } = { total: 2, totalToday: 8 }
    const action = {
      type: 'ORDERS_MESSAGE',
      payload: {
        success: false,
        orders: newOrders,
        totalToday,
        total,
      },
    }

    const newState = ordersSlice.reducer(initialState, action)

    expect(newState.totalToday).toEqual(initialState.totalToday)
    expect(newState.total).toEqual(initialState.total)
    expect(newState.orders).toEqual([])
  })
})
